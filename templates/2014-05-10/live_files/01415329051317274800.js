YnetLBP = {
	getLightbox : function(params) {
		if (!this._instance) {
			this._instance = new YnetLightboxPlayer(params);
		}
		
		return this._instance;
	},
	
	// Adjust the video height in case the lightbox doesn't fit the screen, 
	onResize : function(videoHeight, overflow) {
		if (overflow != this.previousOverflow) {
			this.isPlayerResized = true;
			this.previousOverflow = overflow;
		}
		
		this.isPlayerSetToFullSize = overflow == 0;
		
		yq('#ynet_lightbox_video_container_wrap').height(videoHeight - overflow);
	}
}

/*************** HomepagePlayer object *****************/

/*************** Constructor *****************/

window.YnetLightboxPlayer = function(params) {
	params = params || {};
	
	var isMotorollaDesign = params.isMotorollaDesign || false;
	var liveUrl1 = params.liveUrl1 || '';
	var liveUrl2 = params.liveUrl2 || '';
	var liveImgPath = params.liveImgPath || '/images/ynet_live_thumbnail.jpg';
	var externalImgPath = params.externalImgPath || '/images/external_player_thumbnail.png';
	var fbShareUrl = params.fbShareUrl || 'http://www.facebook.com/sharer.php?u=VIDEO_LINK';
	var motorolaHeaderImageHeight = params.motorolaHeaderImageHeight || 0;
	var playerType = params.playerType || '';
	
	this.lightBox =  new YnetLightbox({
		resize: function(overflow){YnetLBP.onResize(params.videoHeight, overflow)}
	});
	this.videoContainerId = 'ynet_lightbox_video_container';
	this.externalVideoContainerId = 'ynet_lightbox_external_video_container';
	this.sharingContainerId = 'ynet_lightbox_sharing';
	this.fbShareUrl = fbShareUrl;
	this.livePlayers = {
		1: liveUrl1,
		2: liveUrl2
	};
	this.liveImgPath = liveImgPath;
	this.externalImgPath = externalImgPath;
	this.isMotorolaDesign = isMotorollaDesign;
	this.motorolaHeaderImageHeight = motorolaHeaderImageHeight;
	this.numOfLightboxItems = 7;
	this.thumbnailEnlargedWidth = 120;
	this.thumbnailEnlargedHeight = 90;
	this.thumbnailWidth	= 87;
	this.thumbnailHeight = 65;
	this.playerType = playerType;
};

YnetLightboxPlayer.prototype.getTotalVideosNum = function(){
	return this.videos.length;
};
YnetLightboxPlayer.prototype.getVideoByIndex = function(index){
	if(index >= 0 && index < this.videos.length) {
		var video = this.videos[index];
		
		return video;
	}
	return null;
};
YnetLightboxPlayer.prototype.htmlescape = function(str){
	if(str){
		return str.replace(new RegExp('&','g'),'&amp;').replace(new RegExp('<','g'),'&lt;').replace(new RegExp('>','g'),'&gt;').replace(new RegExp("'",'g'),'&#39;').replace(new RegExp('"','g'),'&quot;');
	}
	return '';
};
YnetLightboxPlayer.prototype.getNextId = function(str){
	if(!this.nextId) {this.nextId = 1;}
	return this.nextId++;
};

/*************** Video playback *****************/

YnetLightboxPlayer.prototype.play = function(itemId, footerVideos, params){
	var _this = this;
	params = params || {};
	
	this.explorerFix();
	
	if (footerVideos) {
		this.videos = footerVideos;
	}
	
	var videoData = this.getVideoByIndex(itemId);
	if (!videoData.__initialized) {
		for (var i = 0; i < this.videos.length; i++) {
			var currVideoData = this.videos[i];
			
			if (currVideoData.video) {
				var videoObj = currVideoData.video;
				currVideoData.imgPath = currVideoData.imgPath || videoObj.imgPath;
			}
			
			currVideoData.index = i;
			currVideoData.__initialized = true;
		}
	}
	
	if(videoData){
		//Limor change for task no.5299
		if (videoData.linkType=='external_url') {	
			// Limor bug fix for task no.5332 - stop current video from playing when an external link had been chosen 
			// Greg: update: Close the player when external link was clicked
			var container = yq('#ynet_lightbox_video_container [id^=yntfpcontainer]');
			
			// get the player from the lightBox
			if (container && container.length) {
				var fp = flowplayer(container.get(0));
				if (fp) {
					_this.closeLightbox();
				}
			}
			window.open(videoData.contentLink,'Ynet');
		} else {
			if(!this.lightBox.playerContentInitialized){
				this.initStaticPlayerHtml();
				this.lightBox.playerContentInitialized = true;
			};
			
			this.updatePlayerContent(videoData);
			
			if(!this.lightBox.visible()){
				this.initDynamicPlayerHtml(videoData);
				
				var footer = this.lb.find('#ynet_lightbox_video_footer');
				if (params.customDesignParams && params.customDesignParams.showFooter === false) {
					footer.hide();
				} else {
					footer.show();
				};
				
				this.lightBox.show({
					onLightboxOpen: function(){
						if (typeof params.onLightboxOpen == 'function') {
							params.onLightboxOpen(videoData);
						};
						
						_this.loadVideo(videoData);
					}
					,customOverlayClass: params.customDesignParams ? params.customDesignParams.lightboxOverlayClass : ''
					,customContentClass: params.customDesignParams ? params.customDesignParams.lightboxContentClass : ''
					,topHtml: params.customDesignParams ? params.customDesignParams.topHtml : ''
					,offsetY: params.customDesignParams ? params.customDesignParams.offsetY : ''
				});
			} else {
				this.loadVideo(videoData);
			};
		}
	};
};

// 0 - article video
// 1,2 - live feeds
// 3 - external player
YnetLightboxPlayer.prototype.loadVideo = function(videoData){
	if(videoData && videoData.type != undefined){
		var dimensions = this.getVideoDimensions();
		if(videoData.type == 0){
			this.loadPlayer(videoData, dimensions);
		} else {
			this.loadExternalPlayer(videoData, dimensions);
		};
	};
};
// Load the article player
// Limor bug fix for task no.5332 - if the next video is an external link, go to the next video
YnetLightboxPlayer.prototype.loadPlayer = function(videoData,dimensions){
	var _this = this;
	var nextItemId = (videoData.index + 1) % _this.getTotalVideosNum();					
	var nextVideoData = this.getVideoByIndex(nextItemId);
	var params = {
		destId:  this.videoContainerId,
		onFinish: function(){
			if (nextVideoData.linkType == 'external_url') {
				_this.play((videoData.index + 2) % _this.getTotalVideosNum());
			} else {
				_this.play(nextItemId);
			}
		},
		resizePlayerContainer: YnetLBP.isPlayerResized,
		setPlayerToFullSize: YnetLBP.isPlayerSetToFullSize
	};
	
	this.playerOn();	
	
	if (CmmAppVideoApi.unloadPlayer) {
		CmmAppVideoApi.unloadPlayer(this.videoContainerId);
	};
	
	CmmAppVideoApi.loadPlayer(this.playerType, videoData.videoId, dimensions.width + 1, dimensions.height + 1, params);
	
	YnetLBP.isPlayerResized = false;
};
// Load the external player
YnetLightboxPlayer.prototype.loadExternalPlayer = function(videoData, dimensions){
	var res = [];
	if(videoData.type == 3){
		// external
		var url = videoData.externalBroadcastIframe;
		url = url.replace('500', dimensions.width + 1);
		url = url.replace('400', dimensions.height + 1);
	} else {
		// live
		var url = this.livePlayers[videoData.type];
		url = url.replace('WIDTH', dimensions.width + 1);
		url = url.replace('HEIGHT', dimensions.height + 1);
	};
	
	res.push('<iframe id="ynet_lightbox_iframe" src="' + url + '" scrolling=no frameborder=0 marginheight=0 marginwidth=0 vspace=0 hspace=0 allowtransparency="true"></iframe>');
	this.externalPlayerOn().html(res.join(''));
};
YnetLightboxPlayer.prototype.playerOn = function(){
	this.showSharing(true);
	this.lb.find('#' + this.externalVideoContainerId).hide();
	this.lb.find('#' + this.videoContainerId).show();
		//.css({'opacity':'0','filter':'alpha(opacity=0)'});
};
YnetLightboxPlayer.prototype.externalPlayerOn = function(){
	this.hideSharing(true);
	this.lb.find('#' + this.videoContainerId).hide();
	return this.lb.find('#' + this.externalVideoContainerId).show();
};
YnetLightboxPlayer.prototype.hideSharing = function(animate){
	var s = this.lb.find('#' + this.sharingContainerId);
	if (animate) {s.fadeOut();}
	else {s.hide();};
};
YnetLightboxPlayer.prototype.showSharing = function(animate){	
	var s = this.lb.find('#' + this.sharingContainerId);
	if (animate) {s.fadeIn();}
	else {s.show();};
};
YnetLightboxPlayer.prototype.getVideoDimensions = function(){	
	var v = this.lb.find('#ynet_lightbox_video_container_wrap');
	return {width: v.width(), height: v.height()};
};
YnetLightboxPlayer.prototype.explorerFix = function(videoData){
	if(document.all){
		yq('#' + this.externalVideoContainerId).html('');
	};
};

/*************** Player content*****************/
// Update the title and highlight the playing video thumbnail
YnetLightboxPlayer.prototype.updatePlayerContent = function(videoData){
	// Update title
	var title = this.lb.find('.ynet_lightbox_video_header_title');
	var fullArticle = this.lb.find('.ynet_lightbox_full_article');
	var titleTxt = videoData.title + ' ' + videoData.subTitle;
	var link = '<a href="' + this.htmlescape(videoData.contentLink) + '" target="_blank"></a>';
	if (videoData.hasArticle) {
		title.html(link).find('a').html(titleTxt);
		fullArticle.html(link).show().find('a').html('לכתבה המלאה');
	} else {
		title.html(titleTxt);
		fullArticle.hide();
	};
	// Dim all the thumbnails
	this.lb.find('.ynet_lightbox_thumbnail_shade').addClass('ynet_lightbox_thumbnail_shade_on').show();
	// Highlight the selected video thumbnail
	this.lb.find('.ynet_lightbox_thumbnail[data-ltbx-itemid="'+videoData.index+'"] .ynet_lightbox_thumbnail_shade')
		.removeClass('ynet_lightbox_thumbnail_shade_on');
	// Update Facebook share URL
	this.lb.find('.ynet_lightbox_sharing_fb').attr('href', this.fbShareUrl.replace('VIDEO_LINK', encodeURI(this.htmlescape(videoData.contentLink))));
};
// Init the html that doesn't change between player instances
YnetLightboxPlayer.prototype.initStaticPlayerHtml = function(){
	this.initBasicStructure();
	this.initHeader();
};
// Init the html that changes between player instances, like the footer thumbnails
YnetLightboxPlayer.prototype.initDynamicPlayerHtml = function(videoData){
	this.initFooter(videoData);
};
YnetLightboxPlayer.prototype.initBasicStructure = function(){
	var res = [];
	res.push('<div id="ynet_lightbox_lightbox" ' + (this.isMotorolaDesign ? 'class="ynet_lightbox_lightbox_motorolla"' : '') + '>');
		if (this.isMotorolaDesign) {
			res.push('<img src="/images/hp_player_lightbox_top.png" height="' + this.motorolaHeaderImageHeight + '" />');
		}
		res.push('<div id="ynet_lightbox_video_header"></div>');
		res.push('<div id="ynet_lightbox_video_container_wrap">');
			res.push('<div id="'+this.videoContainerId+'"><div class="' + this.videoContainerId + '"></div></div>');
			res.push('<div id="'+this.externalVideoContainerId+'"></div>');
		res.push('</div>');
		res.push('<div id="ynet_lightbox_video_footer"><div id="ynet_lightbox_video_footer_inner"></div></div>');
	res.push('</div>');
	this.lightBox.html(res.join(''));
	this.lb = yq('#ynet_lightbox_lightbox');
};
YnetLightboxPlayer.prototype.initHeader = function(){
	var _this = this;
	var res = [];
	res.push('<div class="ynet_lightbox_video_header_p">');
		res.push('<div class="ynet_lightbox_floatr ynet_lightbox_video_header_title_wrap">');
			res.push('<span class="ynet_lightbox_video_header_title"></span>');
			res.push('&nbsp;<span class="ynet_lightbox_full_article"></span>');
		res.push('</div>');
		res.push('<div class="ynet_lightbox_floatl ynet_lightbox_video_close ynet_lightbox_pointer">');
			res.push('<img class="ynet_lightbox_floatl" src="/images/hp_player_close.gif" />');
			res.push('<span class="" >סגור</span>');
		res.push('</div>');
	res.push('</div>');

	this.lb.find('#ynet_lightbox_video_header').html(res.join(''));
	this.lb.find('#ynet_lightbox_video_header .ynet_lightbox_video_close').click(function(){
		_this.closeLightbox(_this);
	});
};
YnetLightboxPlayer.prototype.initFooter = function(videoData){
	var _this = this;
	var shareUrl = this.fbShareUrl.replace('VIDEO_LINK', encodeURI(this.htmlescape(videoData.contentLink)));
	
	var res = [];
	res.push('<div id="ynet_lightbox_thumbnails">');
		for(var i = 0; i < this.numOfLightboxItems; i++){		
			var video = this.getVideoByIndex(i);
			
			if (video) {
				if(video.type == 0 || video.type == 3){
					if(video.type == 0){
						////Limor change for task no.5299
						if (video.linkType == 'external_url') {	
							var imgPath = this.externalImgPath;
						} else if (video.imgPath != '') {
							var imgPath = video.imgPath;
						} else {
							var imgPath = this.externalImgPath;
						}
					} else {
						var imgPath = this.externalImgPath;
					};
					var title = video.title;
					if(title.length > 19) {
						title = title.substr(0,18) + '...';
					}
				} else {
					var imgPath = this.liveImgPath;
					var title = 'שידור חי';
				};
				res.push('<div class="ynet_lightbox_pointer ynet_lightbox_floatl_ ynet_lightbox_thumbnail" data-ltbx-itemid="'+i+'">');
					res.push('<div class="ynet_lightbox_thumbnail_img">');
						res.push('<img src="'+this.htmlescape(imgPath)+'" />');
						res.push('<div class="ynet_lightbox_thumbnail_overlay">' + this.htmlescape(title) + '</div>');
						var shadeOn = (i != videoData.index)? 'ynet_lightbox_thumbnail_shade_on' : '';
						res.push('<div class="ynet_lightbox_thumbnail_shade ' + shadeOn + '"></div>');
					res.push('</div>');
				res.push('</div>');
				if(i < this.numOfLightboxItems - 1) {
					var last = (i == 0) ? 'ynet_lightbox_thumbnail_separator_first' : '';
					res.push('<div class="ynet_lightbox_thumbnail_separator '+last+'"></div>');
				};
			};
		};
	res.push('</div>');
	res.push('<div id="' + this.sharingContainerId + '">');
		res.push('<a href="' + shareUrl + '" target="_blank" class="ynet_lightbox_sharing_fb" ></a>');
	res.push('</div>');
	
	this.lb.find('#ynet_lightbox_video_footer_inner').html(res.join(''));
	this.lb.find('.ynet_lightbox_thumbnail').click(
		function(){
			_this.play( yq(this).attr('data-ltbx-itemid') );
	});
	this.lb.find('.ynet_lightbox_thumbnail').hover(
		function(){_this.enlargeThumbnail(this);},
		function(){_this.resetThumbnail(this);}
	);
};
YnetLightboxPlayer.prototype.closeLightbox = function(_thisParam){
	var _this=_thisParam||this;
	_this.lightBox.hide();
	
	if (CmmAppVideoApi.unloadPlayer) {
		CmmAppVideoApi.unloadPlayer(this.videoContainerId);
	};
	
	_this.explorerFix();
};
YnetLightboxPlayer.prototype.enlargeThumbnail = function(thumbnail){
	thumbnail = yq(thumbnail);
	var img = thumbnail.find('.ynet_lightbox_thumbnail_img');
	var overlay = img.find('.ynet_lightbox_thumbnail_overlay');
	var shade = thumbnail.find('.ynet_lightbox_thumbnail_shade_on');
	
	if(true) {
		var animate = 'css';
		var fadeIn = 'show';
		var fadeOut = 'hide';
		var duration = undefined;
	} else {
		var animate = 'animate';
		var fadeIn = 'fadeIn';
		var fadeOut = 'fadeOut';
		var duration = 200;
	}
	
	// Give a higher z-index to current thumbnail
	thumbnail.css('z-index', 10);
	
	// Undim the thumbnail
	shade.hide();
	
	// Show the text overlay
	overlay.stop(true)[animate]({
		top: -20
	}, duration);
	
	// Draw border
	img.addClass('ynet_lightbox_thumbnail_enlarged');
	
	// Enlarge the thumbnail
	img[animate]({
		width: this.thumbnailEnlargedWidth,
		height: this.thumbnailEnlargedHeight,
		top: -((this.thumbnailEnlargedHeight - this.thumbnailHeight) / 2),
		right: -((this.thumbnailEnlargedWidth - this.thumbnailWidth) / 2)
	}, 150);
};
YnetLightboxPlayer.prototype.resetThumbnail = function(thumbnail){
	thumbnail = yq(thumbnail);
	var img = yq(thumbnail).find('.ynet_lightbox_thumbnail_img');
	var overlay = img.find('.ynet_lightbox_thumbnail_overlay');
	var shade = thumbnail.find('.ynet_lightbox_thumbnail_shade_on');
	
	if(true) {
		var animate = 'css';
		var fadeIn = 'show';
		var fadeOut = 'hide';
		var duration = undefined;
	} else {
		var animate = 'animate';
		var fadeIn = 'fadeIn';
		var fadeOut = 'fadeOut';
		var duration = 200;
	}
	
	// Hide the text overlay
	overlay.stop(true)[animate]({
		top: 0
	}, duration);
	
	// Shrink the thumbnail
	img.css({
		width: this.thumbnailWidth,
		height: this.thumbnailHeight,
		top: 0,
		right: 0
	});
	
	// Dim the thumbnail
	shade.css('filter', 'alpha(opacity=70)')[fadeIn]();
	
	// Remove border
	img.removeClass('ynet_lightbox_thumbnail_enlarged');
	
	// Reset z-index
	thumbnail.css('z-index', 1);
};
YnetLightboxPlayer.prototype.animateThumbnailIe = function(target, duration, callback){
	this.css(target);
	if(typeof callback == 'function'){callback()};
};
/********************************************************/

/*************** LightBox object *****************/
window.YnetLightbox = function(params) {
	this.resize = params.resize;
	this.offsetY = 0;
	
	this.init();
};
YnetLightbox.prototype.init = function() {
	this.overlay = yq('<div id="ynet_lightbox_overlay"></div>');
	this.content = yq('<div id="ynet_lightbox_content"><div id="ynet_lightbox_content_top"></div><div id="ynet_lightbox_content_inner"></div></div>');
	this.contentInner = this.content.find('#ynet_lightbox_content_inner');
	
	yq('body').append(this.overlay);
	yq('body').append(this.content);

	if(document.all){
		this.overlay.css({
			'position': 'absolute'
		});
		this.content.css({
			'position': 'absolute'
		});
	};
	
	var _this = this;
	yq(window)
		.resize(function(){_this.updatePosition();})
		.scroll(function(){_this.updatePosition();});
};
YnetLightbox.prototype.show = function(params) {
	var params = params || {};
	var _this = this;

	if (typeof(window.pageRefreshDisable)=='function'){
		window.pageRefreshDisable();
	};

	this.content.addClass(params.customContentClass);
	this.overlay.addClass(params.customOverlayClass);
	
	
	this.offsetY = params.offsetY || 0;
	
	var contentTop = this.content.find('#ynet_lightbox_content_top');
	if (params.topHtml) {
		contentTop.html(params.topHtml).show();
	} else {
		contentTop.hide();
	};

	// hide all iframes to prevent flash objects from showing through
	yq('iframe').each(function(index, e){
		yq(e).data('position', yq(e).css('position')).data('top', yq(e).css('top')).css({'position':'relative', 'top': -100000});
	});
	
		
	// External reszie function makes the necessary adjustements so the lightbox fits the screen
	if(typeof this.resize == 'function'){this.resize(this.getOverflow())};
	
	// Update lightbox position according to lightbox and window size
	this.updatePosition();

	// Show the lightbox
	this.overlay.css('filter', 'alpha(opacity=70)').fadeIn(function(){
		setTimeout(function(){
			_this.content.fadeIn('slow',function(){
				if(typeof params.onLightboxOpen == 'function'){params.onLightboxOpen();};
			});
		}, 200);
	});
	
	return this;
};
YnetLightbox.prototype.hide = function(callback) {
	if (typeof(window.pageRefreshEnable)=='function'){
		window.pageRefreshEnable();
	};
	
	this.content.hide().removeClass();
	this.content.find('#ynet_lightbox_content_top').hide();
	this.overlay.fadeOut('slow').removeClass();
	
	// bring iframes back
	yq('iframe').each(function(index, e){
		if (yq(e).data('position')) {
			yq(e).css('position', yq(e).data('position')).css('top', yq(e).data('top'));
		}
	});
	
	if(typeof callback == 'function'){callback();};
	
	return this;
};
YnetLightbox.prototype.html = function(html) {
	this.contentInner.html(html);
	this.fullHeight = this.content.height();
	
	return this;
};
YnetLightbox.prototype.visible = function() {
	return this.content.is(':visible');
};
YnetLightbox.prototype.updatePosition = function() {
	var position = this.getPosition();
	this.content.css({
		'left': position.left + 'px',
		'top': position.top + 'px'
	});
	this.overlay.css({
		'margin-top': position.marginTop + 'px'
	});
	if(document.all){
		this.overlay.height(yq(window).height());
	};
};
YnetLightbox.prototype.getPosition = function() {
	var w = yq(window);
	var left = (w.width() / 2) - (this.content.width() / 2);
	var top = (w.height() / 2) - (this.content.height() / 2);
	var marginTop = 0;
	if(document.all){
		top += document.body.scrollTop;
		marginTop = document.body.scrollTop;
	};
	
	top += this.offsetY;
	
	return {
		left: left,
		top: top > 0 ? top : 0,
		marginTop: marginTop
	};
};
YnetLightbox.prototype.getOverflow = function(videoData){
	var heightOverflow = this.fullHeight - yq(window).height();
	return heightOverflow > 0? heightOverflow : 0;
};
/********************************************************/
if (typeof openWin != 'function' || typeof openInnewWindow != 'function') {
	window.MSIE_VER = function() {agt=navigator.userAgent.toLowerCase();pos=agt.indexOf('msie')+1;if(pos)return agt.charAt(pos+4);return 0};
	window.openWin = function(url,title,attrib) {wref=window.open(url,title,attrib);if(MSIE_VER()>=5)wref.focus()};
	window.openInnewWindow = function(url,width,height,toolbar) {if(toolbar==1) {openWin(url,'Ynet','toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width='+width+',height='+height)} else {openWin(url,'Ynet','toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,movable=yes,resizable=yes,width='+width+',height='+height)}};
};
