var Exposebox = {
	config : {
		path : window.location.protocol+'//server.exposebox.com',
        files : (window.location.protocol==='http:') ? 'sf.exposebox.com' : 'exposebox.blob.core.windows.net',
		MAX_RESULTS :0
	},
	jQueryLoad : function() {
		var jb = document.createElement('script');
		jb.type = 'text/javascript';
		jb.async = true;
		jb.src = window.location.protocol+'//'+this.config.files+'/widget/exposebox-jquery.js?v=1.00';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(jb, s);
	},
	stringToXML: function(text){
      if (window.ActiveXObject || "ActiveXObject" in window){
        var doc=new ActiveXObject('Microsoft.XMLDOM');
        doc.async='false';
        doc.loadXML(text);
      } else {
        var parser=new DOMParser();
        var doc=parser.parseFromString(text,'text/xml');
      }
      return doc;
  },
  xslToHtml: function(xml,xsl)
  {
    // code for IE
    if (window.ActiveXObject || "ActiveXObject" in window)
      {
      var html=xml.transformNode(xsl);
      }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument)
      {
        var xsltProcessor=new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        var html = xsltProcessor.transformToFragment(xml,document);
      }
    return html;
  },
	jQueryLoaded : function($) {
		// Search for Leucon Widget on page
		//console.log('eb jquery loaded');
		if (!Exposebox.interval) {
			Exposebox.interval = setInterval(Exposebox.waitForWidget, 50);
		}
		this.waitForWidget();
	},
	loadXMLDoc: function(dname)
  {
    if (window.ActiveXObject || "ActiveXObject" in window)
      {
      xhttp=new ActiveXObject("Msxml2.XMLHTTP.3.0");
      }
    else
      {
      xhttp=new XMLHttpRequest();
      }
    xhttp.open("GET",dname,false);
    xhttp.send("");
    return xhttp.responseXML;
  },
	waitForWidget : function() {
		var $ = Exposebox.jQuery;
		Exposebox.widget = $('#exposebox-widget');
        if (!Exposebox.widget[0])
            Exposebox.widget = $('#exposebox-widget-extension');
		//console.log('eb '+Exposebox.widget);
		if (ExposeboxLayout && ExposeboxLayout.isReady && $.isReady) {
			Exposebox.interval = clearInterval(Exposebox.interval);
			if(Exposebox.widget[0])
				Exposebox.start();
            else
                Exposebox.isReady=true;
		}
	},
	markBuy : function(buyUrl,conversion,conversionId) {
		Exposebox.jQuery.ajax({
			type : "GET",
			url : Exposebox.config.path + '/refdir',
			scriptCharset : "utf-8",
			dataType : "jsonp",
			data : {
				url :(buyUrl.substring(0,4)==='http')? buyUrl : window.location.protocol+'//' + window.location.host + buyUrl,
				buy : 'T',
                conversion : conversion,
                conversionId : conversionId
			},
			timeout : 2000
		});
	},
    htmlDecode : function(string) {
        return string.replace(new RegExp('&amp;', 'g'),'&' )
            .replace(new RegExp('&quot;', 'g'),'"' )
            .replace(new RegExp('&lt;', 'g'),'<' )
            .replace(new RegExp('&gt;', 'g'),'>' );
    },
    fromJsonToXmlString : function(string)
    {
        try{
            var obj = this.jQuery.parseJSON(string);
        }catch(err)
        {return string;}
        var xmlStr='';
        for (var key in obj)
        {
            xmlStr+="<"+key+">"+obj[key] +"</"+key+">";
        }
        return xmlStr;
    },
	start : function() {
		//console.log('exposebox start');
		var $ = Exposebox.jQuery;

		var paramLayout = Exposebox.widget.attr('data-layout');
		var layout = ExposeboxLayout[paramLayout];
        Exposebox.layout = layout;
		
		// Detect parameters
        Exposebox.paramTitle = Exposebox.widget.attr('data-text1')||(layout.getTitle&&layout.getTitle())||window.document.title;
        Exposebox.paramSubtitle = Exposebox.widget.attr('data-text2');
		var parseCategory = function ()
		{
          if(layout.categoryParser)
            return layout.categoryParser();
          else
            return ;
		}
        Exposebox.paramCategory = Exposebox.widget.attr('data-category')||parseCategory();
        Exposebox.paramType = Exposebox.widget.attr('data-type');

		var parseUrl = function(urlString)
		{
          if(layout.urlParser)
          {
            return layout.urlParser(urlString);
          }
          else
            return urlString;
		}
        Exposebox.paramURL = Exposebox.widget.attr('data-url')||parseUrl(window.location.href);
        var paramUrlDefault = Exposebox.widget.attr('data-url-d');
        if(paramUrlDefault)
        {
            Exposebox.paramURL = document.referrer||paramUrlDefault;
            if(!Exposebox.paramSubtitle)
                Exposebox.paramSubtitle = Exposebox.paramURL;
        }

		var paramShow = Exposebox.widget.attr('data-show') || false;
		if (paramShow) {
			paramShow = (paramShow.toLowerCase() === 'true');
		}
		var paramDebug = Exposebox.widget.attr('debug') || false;
        Exposebox.paramImageUrl = Exposebox.widget.attr('data-image-url');
        Exposebox.paramPrice = Exposebox.widget.attr('data-text3');
        Exposebox.paramShipping = Exposebox.widget.attr('data-text4');
        Exposebox.paramPayment = Exposebox.widget.attr('data-text5');
        Exposebox.paramRating = Exposebox.widget.attr('data-rating');
        Exposebox.paramPaymentSmall = Exposebox.widget.attr('data-text6');
        var paramSaleOpen =(layout.isOpen&&layout.isOpen())||Exposebox.widget.attr('data-sale-open') || 'T';
        var paramDataFreeJson = Exposebox.widget.attr('data-free-json');
        if(paramDataFreeJson)
            Exposebox.paramDataFreeJson=Exposebox.htmlDecode(paramDataFreeJson);
        Exposebox.paramUK = Exposebox.widget.attr('data-uk');
        Exposebox.paramUrlSuffix = Exposebox.widget.attr('data-url-suffix') || '';
        Exposebox.paramUrlSuffixMode = Exposebox.widget.attr('data-url-suffix-m');
        Exposebox.paramUrlSuffixB = Exposebox.widget.attr('data-url-suffix-b');
        Exposebox.paramUrlPrefix = Exposebox.widget.attr('data-url-prefix') ;
        Exposebox.paramImpTrack = Exposebox.widget.attr('data-imp-track') ;
        Exposebox.paramClickTrack = Exposebox.widget.attr('data-click-track') ;
        Exposebox.paramKeepMerchants = (Exposebox.widget.attr('data-keep')||'').toLowerCase() === 'true' ;
        Exposebox.paramXsl = Exposebox.widget.attr('data-xsl') ;
		var paramMax = Exposebox.widget.attr('data-recommendations-num');
        var paramPaging = Exposebox.widget.attr('paging')||false;
        if (paramPaging) {
            paramPaging = (paramPaging.toLowerCase() === 'true');
        }
		if(paramMax)  Exposebox.layout.MAX_RESULTS=parseInt(paramMax,10);

        Exposebox.paramSaleOpen = paramSaleOpen.charAt(0).toUpperCase();

		if (paramDebug||(window.location.href.indexOf('exposebox=debug') >= 0)||( document.referrer.indexOf('exposebox=debug') >= 0)) {
			Exposebox.config.path = window.location.protocol+'//localhost:65025';
		}

		// Hide the widget until loading is done
		var shouldShowWidget = (paramShow)
				|| (window.location.href.indexOf('exposebox=show') >= 0)||( document.referrer.indexOf('exposebox=show') >= 0);
		shouldShowWidget ? Exposebox.widget.show() : Exposebox.widget.hide();


        Exposebox.runAfterLoad = Exposebox.widget.attr('data-onload') ;
		// Methods
		// >>>>>>>>addMerchantsToPage>>>>>>>
		var addMerchantsToPage = function(merchants ,abt) {

			if (!merchants || merchants.length <= 0) {
				return;
			}
            var finalHtml = Exposebox.createHtml(merchants,Exposebox.layout.MAX_RESULTS,abt);
            var x = Exposebox.layout.MAX_RESULTS;
			Exposebox.widget.html(finalHtml);
			if(Exposebox.paramImpTrack) $.get(Exposebox.paramImpTrack, function() {});
            Exposebox.addOnClick(Exposebox.widget);
            if(Exposebox.extensions)
            {
                for(var i=0;i<Exposebox.extensions.length;i++)
                {
                    var ex = Exposebox.extensions[i];
                    var num = ex.maxResults;
                    var exHtml = Exposebox.createHtml(merchants.splice(x,merchants.length),num,abt,ex);
                    x+=num;
                    var widget = $(ex.widget)
                    widget.html(exHtml);
                    Exposebox.addOnClick(widget);
                }
            }
            if(Exposebox.runAfterLoad)
            {
                eval(Exposebox.runAfterLoad);
            }
            if(Exposebox.extensions)
            {
                for(var i=0;i<Exposebox.extensions.length;i++)
                {
                    var ex = Exposebox.extensions[i];
                    eval(ex.runAfterLoad);
                }
            }
		};
		// <<<<<<<<<<<addMerchantsToPage<<<<<<<<<
        if(Exposebox.paramUrlSuffixB)
            Exposebox.fullRes=true;
		// >>>>>>>>fetchBetterMerchants>>>>>>>


		var fetchBetterMerchants = function() {
            var url = (Exposebox.layout.url||Exposebox.config.path) + '/MerchantsService.svc/GetMerchants';

            var num = Exposebox.layout.MAX_RESULTS;
            if(Exposebox.extensions)
            {
                for(var i=0;i<Exposebox.extensions.length;i++)
                {
                    num+=Exposebox.extensions[i].maxResults;
                }
            }

            Exposebox.fetchMerchants(url,{maxResults:num},function(response) {
                if(Exposebox.fullRes)
                {
                    if(Exposebox.paramKeepMerchants)
                        Exposebox.keep = response.merchants.slice(0);
                    addMerchantsToPage(response.merchants,response.abt);
                }
                else
                {
                    if(Exposebox.paramKeepMerchants)
                        Exposebox.keep = response.slice(0);
                    addMerchantsToPage(response);
                }
            });
		};

        this.readExtension();

        if(!paramPaging)
            fetchBetterMerchants();

        //Exposebox is  ready
        this.isReady=true;
	},
    readExtension : function()
    {
        var $ = Exposebox.jQuery;
        var extensions = $('#exposebox-widget-extension');
        if(!extensions&&extensions.length<1) return;
        if(extensions[0]===this.widget[0]) return;
        Exposebox.extensions = [];
        for(var i=0;i<extensions.length;i++)
        {
            var ex = {widget:$(extensions[i])};
            Exposebox.extensions[0] = ex;
            var layout = ExposeboxLayout[ex.widget.attr('data-layout')];
            ex.layout = layout;
            var paramMax =  $(ex.widget).attr('data-recommendations-num');
            if(paramMax)
                ex.maxResults=parseInt(paramMax,10);
            else
                ex.maxResults = ex.layout.MAX_RESULTS;
            ex.paramXsl = ex.widget.attr('data-xsl') ;
            ex.runAfterLoad = ex.widget.attr('data-onload') ;
        }

    },
    getPage : function(start,num,callback)
    {
        var url = (Exposebox.layout.url||Exposebox.config.path) + '/getPage';
        Exposebox.fetchMerchants(url,{start:start , num:num},function(response) {
            return callback(response);
        });
    },
    isReady:false,
    createHtmlFromXls:function(xls,max,widget)
    {
        if(!Exposebox.keep) return null;
        if(widget==='exposebox-widget-extension')
        {
            return this.createHtml(Exposebox.keep.slice(Exposebox.layout.MAX_RESULTS),max,1,{layout:ExposeboxLayout.XSLT,paramXsl:xls});
        }
        else
        {
            return this.createHtml(Exposebox.keep.slice(0),max,1,{layout:ExposeboxLayout.XSLT,paramXsl:xls});
        }
    },
    createHtml : function(merchants,max,abt,ex)
    {
        if(!ex)
            ex=Exposebox
        if(!abt)  abt=1;

        var finalHtml = ex.layout.finalHtml;
        var template = ex.layout.template;
        var endHtml = ex.layout.endHtml;


        var jumpMe = 0;

        for (var i = 0; i < merchants.length
            && i < max + jumpMe; i++) {
            var merchant = merchants[i];

            if (Exposebox.paramURL === merchant['url']
                || (Exposebox.paramTitle === merchant['title']
                && Exposebox.paramSubtitle === merchant['subtitle']
                && Exposebox.paramPrice === merchant['price']
                && Exposebox.paramShipping === merchant['shipping']
                && Exposebox.paramPayment === merchant['payment']
                && Exposebox.paramPaymentSmall === merchant['payment_small']
                && Exposebox.paramRating === merchant['rating']
                && Exposebox.paramImageUrl === merchant['image_url'])) {
                jumpMe++;
                continue;
            }

            if(Exposebox.paramUrlSuffixB&&abt&&abt==2)
                Exposebox.paramUrlSuffix=Exposebox.paramUrlSuffixB;
            if(merchant['url']&&Exposebox.paramUrlSuffix.length>0)
            {
                if(Exposebox.paramUrlSuffixMode&&Exposebox.paramUrlSuffixMode==='as_is')
                    merchant['url']=merchant['url']+Exposebox.paramUrlSuffix;
                else if (Exposebox.paramUrlSuffixMode&&Exposebox.paramUrlSuffixMode==='ae')
                {
                    if(merchant['url'].slice(-1)==='=')
                        merchant['url']=merchant['url']+Exposebox.paramUrlSuffix;
                }
                else if(merchant['url'].indexOf('?')>0)
                    merchant['url']=merchant['url']+'&'+Exposebox.paramUrlSuffix;
                else
                    merchant['url']=merchant['url']+'?'+Exposebox.paramUrlSuffix;
            }
            if(merchant['url']&&Exposebox.paramUrlPrefix&&Exposebox.paramUrlPrefix.length>0)
            {
                merchant['url']=Exposebox.paramUrlPrefix+encodeURIComponent(merchant['url']);
            }
            Exposebox.merchants[merchant['url']] = {id:merchant.id , type_id:merchant.type_id};

            if(ex.layout.alterImageUrl)
                merchant['image_url']=ex.layout.alterImageUrl(merchant['image_url']);

            if(merchant['free_data'])
                if(ex.paramXsl)
                    merchant['free_data']=Exposebox.fromJsonToXmlString(merchant['free_data']);
                else if(ex.layout.parseJson)
                {
                    try
                    {
                        var freeData = JSON.parse(merchant['free_data']);
                        for(var k in freeData)
                        {
                            merchant['fd_'+k]=freeData[k];
                        }
                    }catch(err)
                    {}
                }

            if(typeof template == 'string' || template instanceof String)
                var html = template;
            else
                var html = template[merchant.type_id];
            for (key in merchant) {
                if (merchant[key]) {
                    html = html.replace(new RegExp('{{' + key + '}}', 'g'),
                        merchant[key]);
                }
            }
            if(merchant['free_data']&&!ex.paramXsl)
            {
                try{
                    var freeData = JSON.parse(merchant['free_data']);
                    for(key in freeData) {
                        if (freeData[key]) {
                            html = html.replace(new RegExp('{{' + key + '}}', 'g'),
                                freeData[key]);
                        }
                    }
                }catch (err)
                {}
            }


            finalHtml = finalHtml + html;
        }

        finalHtml = finalHtml + endHtml;
        finalHtml = finalHtml.replace(new RegExp('{{.+?}}', 'g'), '');

        if(ex.paramXsl)
        {
            var xml = Exposebox.stringToXML(finalHtml.replace(new RegExp('&', 'g'), '&amp;'));
            var xsl= Exposebox.loadXMLDoc(ex.paramXsl);
            finalHtml=Exposebox.xslToHtml(xml,xsl);
        }
        return finalHtml;
    },
    fetchMerchants : function(url,params,callback)
    {
        var myCallback =  'c'+Math.floor((Math.random()*100000000)+1);
        if(!params)
        {
            params={};
        }
        params.subtitle=Exposebox.paramSubtitle;
        params.category=Exposebox.paramCategory;
        params.type=Exposebox.paramType;
        params.url=Exposebox.paramURL;
        params.title=Exposebox.paramTitle;
        params.imageUrl=Exposebox.paramImageUrl;
        params.price=Exposebox.paramPrice;
        params.shipping=Exposebox.paramShipping;
        params.payment=Exposebox.paramPayment;
        params.rating=Exposebox.paramRating;
        params.paymentSmall=Exposebox.paramPaymentSmall;
        params.saleOpen=Exposebox.paramSaleOpen;
        params.fullRes=Exposebox.fullRes;
        params.freeData=Exposebox.paramDataFreeJson;
        params.uk = Exposebox.paramUK;
        Exposebox.jQuery.ajax({
            type : "GET",
            url : url,
            scriptCharset : "utf-8",
            dataType : "jsonp",
            data :params,
            timeout : 10000,
            jsonpCallback: myCallback,
            success : callback
        });
    },
    notifyOnClick:function(event,openNew,noTrack3d,clickEvent) {
        var url = event.currentTarget.href;
        var m = Exposebox.merchants[url];
        //if (paramUrlSuffix && paramUrlSuffix.length>0)  url = url.substring(0,url.length-paramUrlSuffix.length);
        var openSameWin = !(Exposebox.layout&&Exposebox.layout.openNew||openNew);
        if(openSameWin)
            event.preventDefault();

        if(Exposebox.paramClickTrack&&!noTrack3d)
        {
            var clickTrackFinished = false;
            //$.get(paramClickTrack, function() {clickTrackFinished = true; });
            //for DFA
            var pix = new Image();
            pix.src = Exposebox.paramClickTrack;
            var finish =function(){
                clickTrackFinished = true;
            };
            pix.onload = finish;
            pix.onerror = finish;
            pix.onabort = finish;
        }

        Exposebox.jQuery.ajax({
            type : "GET",
            url : Exposebox.config.path + '/refdir',
            scriptCharset : "utf-8",
            dataType : "jsonp",
            data : {
                url : url,
                fromUrl : Exposebox.paramURL,
                type_id : m&&m.type_id,
                id : m&&m.id,
                buy : clickEvent
            },
            timeout : 2000,
            complete : function(jqXHR, textStatus) {
                if(openSameWin)
                {
                    if(Exposebox.paramClickTrack)
                    {
                        if(clickTrackFinished) window.top.location.href = url;
                        else
                        {
                            var retry = 0;
                            var openHrefHandel = setInterval(function(){
                                if(clickTrackFinished||retry>4)
                                {
                                    window.top.location.href = url;
                                    clearInterval(openHrefHandel);
                                }
                                retry++;
                            },100);
                        }
                    }
                    else
                        window.top.location.href = url;
                }
            }
        });
    },
    addOnClick : function(widget)
    {
        widget.on('click', 'a', Exposebox.notifyOnClick);
        widget.on('mouseup', 'a', function(event)
        {
            if(event.which==2)
            {
                Exposebox.notifyOnClick(event,true);
            }
            if(event.which==3)
            {
                Exposebox.notifyOnClick(event,true,false,'R');
            }
        });
    },
    logViewRecommendations:function(recommendations)
    {
        for(var i=0;i<recommendations.length;i++)
        {
            Exposebox.jQuery.ajax({
                type:"get",
                url :Exposebox.config.path + '/logRecommendationView',
                data: {
                    url : Exposebox.paramURL,
                    type : Exposebox.paramType,
                    recommendedUrl :recommendations[i].url,
                    recommendedType : recommendations[i].type_id,
                    recommendedId : recommendations[i].id
                },
                contentType: "application/json; charset=utf-8",
                dataType:"jsonp",
                success : function(jqXHR, textStatus) {
                }

            });
        }
    },
    merchants:[],
    pop : function(xls)
    {
        var html = this.createHtmlFromXls(xls,1);
        if(html)
        {
            var $ = Exposebox.jQuery;
            $('body').append('<div id="exposebox-pop" style="position:fixed; float:right; bottom:2px; right:0px; z-index:10000; display:none "></div>');
            $('#exposebox-pop').append(html);
            $('#exposebox-pop').append('<button id="exposebox-pop-close" style="position:absolute;top:10px;left:10px;">X</button>');
            $('#exposebox-pop-close').click(function(){
                $( '#exposebox-pop' ).animate({
                    height: "toggle"
                }, 500);
            });
            $( '#exposebox-pop' ).animate({
                height: "toggle"
            }, 1000, function() {
                // Animation complete.
            });
        }
    }

};
// <<<<<<<<<<<fetchBetterMerchants<<<<<<<<<
(function() {
	Exposebox.jQueryLoad();
})();