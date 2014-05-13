
//*************** YnetLightbox object *****************//
window.PromolightBoxComponent1024 = function(resize) {
	this.resize = resize;
	this.init();
};
PromolightBoxComponent1024.prototype = {
	init : function() {	
		this.overlay = yq('<div id=\"ynet_lightbox_overlay_'+Math.floor((Math.random()*10000000000)+1)+'\"></div>');
		this.content = yq('<div id=\"ynet_lightbox_content_'+Math.floor((Math.random()*10000000000)+1)+'\"></div>');		
		this.overlay.css({
					 position: "fixed",
                     top: "0",
                     left: "0",
                     width: "100%",
                     height: "100%",
                     opacity: "0.5",
                     background: "black",
                     zIndex: "9998",
                     display: "none",
                     overflow: "hidden"
		});
		this.content.css({
					 position: "fixed",
                     direction: "rtl",                     
                     top: "0",
                     left: "0",                     
                     zIndex: "999999",
                     display: "none"	
		});
		yq('body').append(this.overlay);
		yq('body').append(this.content);
		var _this = this;
		yq(window).resize(
			function(){_this.updatePosition();}
		)
	},
	show : function(onAfterShow) {
		var self = this;
		if (typeof(window.pageRefreshDisable)=='function'){
			window.pageRefreshDisable();
		};
		// hide all iframes to prevent flash objects from showing through
		yq('iframe').css('visibility', 'hidden');
		
		//ie error
		// External resize function makes the necessary adjustements so the lightbox fits the screen
		if(typeof this.resize == 'function'){this.resize(this.getOverflow())};
		
		// Update lightbox position according to lightbox and window size
		this.updatePosition();
		// Show the lightbox
		this.overlay.css('filter', 'alpha(opacity=70)').fadeIn(function(){
			setTimeout(function(){
				self.content.fadeIn('slow',function(){
					if(typeof onAfterShow == 'function'){onAfterShow();};
				});
			}, 200);
		});
		
		return this;
	},
	hide : function(callback) {
		if (typeof(window.pageRefreshEnable)=='function'){
			window.pageRefreshEnable();
		};
		
		this.content.hide();
		this.overlay.fadeOut('slow');
		
		// bring iframes back
		yq('iframe').css('visibility', 'visible');
		
		if(typeof callback == 'function'){callback();};
		
		return this;
	},
	html : function(html) {
		this.content.html(html);
		this.fullHeight = this.content.height();
		
		return this;
	},
	getContainer : function (){
		return this.content;
	},	
	getOverlay : function (){
		return this.overlay;
	},
	visible : function() {
		return this.content.is(':visible');
	},
	updatePosition : function() {
		var position = this.getPosition();
		this.content.css({
			'left': position.left + 'px',
			'top': position.top + 'px',
			'width': position.width + 'px'
		});

	},
	getPosition : function() {
		var w = yq(window);
		var left = (w.width() / 2) - (this.content.width() / 2);
		var top = (w.height() / 2) - (this.content.height() / 2);
		var width = this.content.width();
		
		return {
			left: left,
			top: top > 0 ? top : 0,
			width: width
		};
	}
}