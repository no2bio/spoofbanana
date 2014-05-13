var ExposeboxLayout = {
    isReady : true,
    'styleriver' : {
        finalHtml:'<div class="ExposeBoxProducts"><div class="headline">עוד באותו עניין</div><div class="items">',
        template:'<a href="{{url}}"><div class="item"><img src={{image_url}}><div class="description">{{title}}<div class="price">{{price}} <span class="discount">{{subtitle}}</span></div></div></div></a>',
        endHtml:'</div></div>',
        MAX_RESULTS:10
    },
    'ynet' : {
        finalHtml:'<div class="ww3s_Main"><div class="ww3s_top"><div class="ww3s_logo"><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx"><img src="http://www.ynet.co.il/images/wwsearchlogo.gif"></a></div><div><a target="_blank" href="http://www.winwin.co.il/RealEstate/ForSale/RealEstatePage.aspx">דירות</a><span>|</span><a target="_blank" href="http://www.winwin.co.il/Cars/CarPage.aspx">רכב</a><span>|</span><a	target="_blank"	href="http://www.winwin.co.il/SecondHand/SecondHandPage.aspx">יד	שניה</a><span>|</span><a target="_blank"	href="http://www.winwin.co.il/%D7%93%D7%A8%D7%95%D7%A9%D7%99%D7%9D/">דרושים</a><span>|</span><a target="_blank" href="http://www.winwin.co.il/RealEstate/Insurance/RealEstatePage.aspx?ref=a_ynet">ביטוח דירה</a><span>|</span><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx">עוד</a></div></div><div class="ww3s_center">',
        template:'<div class="ww3s_strip"><div class="ww3s_img"><a target="_blank" href="{{url}}"> <img src="{{image_url}}" alt="{{payment}} {{subtitle}}" style="visibility: visible;"></a></div><div class="ww3s_text"><b><a target="_blank" href="{{url}}">{{payment}}</a></b></div><div class="ww3s_arrow"><a target="_blank" href="{{url}}"><img src="http://www.ynet.co.il/images/wwsearcharrow.gif" height="5" width="8/"></a></div><div class="ww3s_gray_text"><a target="_blank" href="{{url}}">{{subtitle}}</a></div></div><div class="separ"></div>',
        endHtml:'</div></div>',
        url: 'http://nodejs-cluster-test-1592862875.us-east-1.elb.amazonaws.com',
        MAX_RESULTS:3
    },
    'ynet2' : {
        finalHtml:'<div class="ww3s_Main"><div class="ww3s_top"><div class="ww3s_logo"><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx?utm_source=ynet_hp-expose&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp"><img src="http://sf.exposebox.com/winwin/winwin.png" style=" height: 20px;"></a></div><div><a target="_blank" href="http://www.winwin.co.il/RealEstate/ForSale/RealEstatePage.aspx?utm_source=ynet_hp-expose-nadlanLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">דירות</a><span>|</span><a target="_blank" href="http://www.winwin.co.il/Cars/CarPage.aspx?utm_source=ynet_hp-expose-carLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">רכב</a><span>|</span><a	target="_blank"	href="http://www.winwin.co.il/SecondHand/SecondHandPage.aspx?utm_source=ynet_hp-expose-yad2Link&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">יד	שניה</a><span>|</span><a target="_blank" href="http://nadlan.winwin.co.il?utm_source=ynet_hp-expose-npLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">נדלן חדש</a><span>|</span><a target="_blank"	href="http://www.winwin.co.il/Publish/Page.aspx?utm_source=ynet_hp-expose-parsemuLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp"><b>פרסמו מודעה</b></a><span>|</span><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx?utm_source=ynet_hp-expose-moreLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp" style="padding-left: 6px;">עוד</a></div></div><div class="ww3s_center">',
        template:'<div class="ww3s_strip"><div class="ww3s_img"><a target="_blank" href="{{url}}"> <img src="{{image_url}}" alt="{{payment}} {{subtitle}}" style="visibility: visible;"></a></div><div class="ww3s_text"><b><a target="_blank" href="{{url}}">{{payment}}</a></b></div><br><div class="ww3s_gray_text"><a target="_blank" href="{{url}}">{{subtitle}}</a></div></div><div class="separ"></div>',
        endHtml:'</div></div>',
        urlt: 'http://nodejs-cluster-test-1592862875.us-east-1.elb.amazonaws.com',
        openNew: true,
        MAX_RESULTS:3
    },
    'walla-home':
    {
        finalHtml:'<div class="leftsec shops clrc sec_shops_907" id="sec_shops_907"><h2 class="header sub_header"><a class="title evt_0" href="http://www.wallashops.co.il/?cfm=CDEA13186F40&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="קניות">קניות</a><span class="sep"></span><a class="icon evt_1" href="http://www.wallashops.co.il/?cfm=CDEA13186F40&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="קניות"><img src="http://isc.wcdn.co.il/w11/h/left/logos/walla_shops_logo_b.jpg" alt="קניות"></a></h2><!-- items --><div class="clrc shopsItems leftitems">',
        template:'<div class="shopitem itemeb"><span class="deal dt{{type_id}}"></span><a class="media evt_2" href="{{url}}" title="{{fd_WallaFirstFloodLine}} {{fd_WallaSecondFloodLine}}"><img onerror="this.src=\'http://isc.wcdn.co.il/w11/h/trans.gif\'" class="shopimg" src="{{image_url}}" alt="{{fd_WallaFirstFloodLine}} {{fd_WallaSecondFloodLine}}"></a><a class="title evt_3" href="{{url}}" title="{{fd_WallaFirstFloodLine}} {{fd_WallaSecondFloodLine}}">{{fd_WallaFirstFloodLine}}<br>{{fd_WallaSecondFloodLine}}</a></div>',
        endHtml:'</div><!-- links -->	<div class="bottom_links"><ul class="shopsManyLinks clrc"><li class="right" style="padding-left:5px;"><a class="hvr2 evt_6" href="http://www.wallashops.co.il/Sale?cfm=fbc5b8a6d121&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="מבצעי היום!">מבצעי היום!</a></li><li class="right" style="padding-left:5px;"><a class="hvr2 evt_7" href="http://www.wallashops.co.il/%D7%93%D7%99%D7%9C-%D7%99%D7%95%D7%9E%D7%99?utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="הדיל היומי">הדיל היומי</a></li>	<li class="right" style="width:70px;"><a class="hvr2 evt_8" href="http://www.wallashops.co.il/link3?cfm=8dda10a7428c&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="סמארטפונים">סמארטפונים</a></li><li class="right" style="padding-left:5px;"><a class="hvr2 evt_9" href="http://www.wallashops.co.il/link4?cfm=b6e60f405934&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="ניידים וטאבלט">ניידים וטאבלט</a></li><li class="right" style="padding-left:5px;"><a class="hvr2 evt_10" href="http://www.wallashops.co.il/%D7%A8%D7%94%D7%99%D7%98%D7%99%D7%9D?utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)" title="רהיטים">רהיטים</a></li><li class="right" style="width:70px;"><a class="hvr2 evt_11" href="http://www.wallashops.co.il/link6?cfm=d31a963c8922&utm_source=walla.co.il&utm_medium=referral&utm_campaign=AB+Sep2013:+Walla+Exposebox&utm_content=(not+set)"  title="טלויזיות" >טלויזיות</a></li></ul></div></div>',
        MAX_RESULTS:2,
        parseJson:true,
        alterImageUrl:function(url){return url.replace('ypk.cs4u.co.il','shops.wcdn.co.il');}
    },
    'wix-blog':{
        finalHtml:'<div>',
        template:'<a href="{{url}}" style="text-decoration: none;"><img class="wix-blog-img" src="{{image_url}}"></img></a>',
        endHtml:'</div>',
        MAX_RESULTS:1
    },
    'ynet3' : {
        finalHtml:'<div class="ww3s_Main"><div class="ww3s_top"><div class="ww3s_logo"><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx?utm_source=ynet_hp-expose&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp"><img src="http://s3-eu-west-1.amazonaws.com/exposebox/winwin/winwin3.png" ></a></div></div><div class="ww3s_center">',
        template:'<a target="_blank" class="ww3s_link_1_{{type_id}}" href="http://nadlan.winwin.co.il/?utm_source=ynet_hp-expose-npLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">דירות חדשות</a><a  target="_blank" class="ww3s_link_2_{{type_id}}" href="http://www.winwin.co.il/RealEstate/ForSale/RealEstatePage.aspx?utm_source=ynet_hp-expose-nadlanLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">דירות</a><a  target="_blank" class="ww3s_link_3_{{type_id}}" href="http://www.winwin.co.il/Cars/CarPage.aspx?utm_source=ynet_hp-expose-carLink&utm_medium=component&utm_campaign=ongoing&Ref=a_ynet_hp">רכבים</a><div class="ww3s_strip"><div class="ww3s_img"><a target="_blank" href="{{url}}"><img src="{{image_url}}" alt="{{payment}} {{subtitle}}" style="visibility: visible;"></a></div><div class="ww3s_text"><a target="_blank" href="{{url}}">{{payment}}</a></div><br><div class="ww3s_gray_text"><a target="_blank" href="{{url}}">{{subtitle}}</a></div><a target="_blank" class="ww3s_dt" href="{{url}}">פרטים נוספים &gt;&gt;</a></div>',
        endHtml:'</div></div>',
        urlt: 'http://nodejs-cluster-test-1592862875.us-east-1.elb.amazonaws.com',
        openNew: true,
        MAX_RESULTS:1
    },
    'ynet-new' : {
        finalHtml:'<div class="winwin_mark_winwin dyother dyMonitor"><div id="ww3s_Main" class="ww3s_Main"><div class="ww3s_top ww2s_top"><div class="ww3s_logo"><a target="_blank" href="http://www.winwin.co.il/homepage/Page.aspx"><span class="sprite_homepage_winwin_logo_v2 ww3s_Main_img_logo"></span></a></div><div class="ww2s_Main_title_links"><a target="_blank" href="http://www.winwin.co.il/RealEstate/ForSale/RealEstatePage.aspx">נדל"ן</a><span class="sprite_homepage_winwin_sep_v2 winwin_separator"></span><a target="_blank" href="http://www.winwin.co.il/Cars/CarPage.aspx">רכב</a><span class="sprite_homepage_winwin_sep_v2 winwin_separator"></span><a target="_blank" href="http://www.winwin.co.il/SecondHand/SecondHandPage.aspx">יד שניה</a><span class="sprite_homepage_winwin_sep_v2 winwin_separator"></span><a target="_blank" href="http://www.winwin.co.il/%D7%93%D7%A8%D7%95%D7%A9%D7%99%D7%9D/">דרושים</a></div></div><div class="ww2s_center"><ul>',
        template:'<li class="ww2s_strip ww2s_strip_first"><a target="_blank" href="{{url}}"><img onload="this.style.visibility=&quot;visible&quot;;" title="{{title}}" alt="{{title}}" src="{{image_url}}" class="ww2s_img" style="visibility: visible;"></a><div class="ww2s_text"><p class="ww3s_bold"><a target="_blank" href="{{url}}">{{title}}</a></p><p><a target="_blank" href="{{url}}">{{subtitle}}<br>{{shipping}}</a></p></div></li>',
        endHtml:'</ul></div></div></div>',
        urlt: 'http://nodejs-cluster-test-1592862875.us-east-1.elb.amazonaws.com',
        MAX_RESULTS:3
    },
    'XSLT' : {
        finalHtml:'<?xml version="1.0" encoding="UTF-8"?><catalog>',
        template:'<element><id>{{id}}</id><image_url>{{image_url}}</image_url><payment>{{payment}}</payment><payment_small>{{payment_small}}</payment_small><price>{{price}}</price><rating>{{rating}}</rating><sale_open>{{sale_open}}</sale_open><shipping>{{shipping}}</shipping><subtitle>{{subtitle}}</subtitle><title>{{title}}</title><type_id>{{type_id}}</type_id><url>{{url}}</url><data>{{free_data}}</data></element>',
        endHtml:'</catalog>'
    },
    'wix_w3' : {
        finalHtml:'',
        endHtml:'',
        MAX_RESULTS:1,
        template:'<div style="width:723px;margin-left:auto;margin-right:auto; font-size: 12px; color: #000000; font-family:verdana,helvetica,arial,sans-serif;"><h2><a target="_blank" rel="nofollow" href="{{url}}" style="color: #000000; background-color: transparent;">{{title}}</a></h2><div style="float:left;width:500px;padding-right:10px;"><p><a target="_blank" rel="nofollow" href="{{url}}" style="color: #000000; background-color: transparent; font-family:verdana,helvetica,arial,sans-serif;">Start creating</a> your own beautiful <b>{{price}}</b>{{payment}} website. It\'s easy and free!</p><p>Wix.com provides an easy-to-use online platform where you can create and publish your own website. Enjoy powerful drag & drop editing tools & customizable website designs.</p><p>With total design control, eCommerce features, superior SEO results and free domains, Wix is the ultimate solution for creating your perfect and exquisite HTML website.</p><p>Over 39 million users have created their website with Wix.</p><p><a target="_blank" rel="nofollow" href="{{url}}" style="color: #000000; background-color: transparent;"><b>Create yours now! &raquo;</b></a></p></div></div><div style="float:left;width:200px;"><a id="ebDiv7435146779753268" href="{{url}}" dir="ltr" style="display: inline; width: 200px; height: 150px; margin: 0px auto; text-decoration: none; color: #000000;"><img width="200" height="150" style="border:0px; padding:0px; margin:0px; width:200; height:150; cursor:pointer; cursor: hand; " src="{{image_url}}">{{shipping}}</a></div>'
    },
    'wix_lp' : {
        finalHtml:'',
        endHtml:'',
        MAX_RESULTS:1,
        template:'<img src="http://s3-eu-west-1.amazonaws.com/exposebox/wix/23.png"><div  style="TOP: -340PX;position: relative;left: 319px;overflow: hidden;height: 190px;"><img src="{{image_url}}" style="width:338px;"></div>'
    },
    'wix_d' : {
        finalHtml:'',
        endHtml:'',
        MAX_RESULTS:6,
        template:'<li><div class="templateContainer"><div class="tviewCont" style="opacity: 1;"><table class="tviewTable_web" cellpadding="0" cellspacing="0"><tbody><tr><td class="tviewRow1_html" colspan="2" valign="top" align="left"><span class="tviewTitle">{{title}}</span></td></tr><tr><td class="tviewRow2" colspan="2" align="center" valign="top"><a onclick="openViewer(\'\',\'{{url}}\',\'0\',\'2\',\'1\')" href="{{url}}" target="_blank">	<img onload="showSkin(0);" alt="{{title}}" class="tviewImg_web" title="{{Description}}" src="{{image_url}}"></a></td></tr><tr><td class="tviewRow3" align="right" valign="top"><a onclick="openViewer(\'{{price}}\',\'{{url}}\',\'0\',\'2\',\'1\')" href="{{url}}" class="tviewPreview" target="_blank"></a></td><td class="teditRow3" align="left" valign="top"><button onclick="openEditor(\'{{price}}\',\'{{shipping}}\',\'0\',\'html\',\'2\',\'1\')" class="tviewEdit"></button></td></tr></tbody></table></div></div></li>'
    },
	'winwin-car':{
	  finalHtml:'<div class="ex-container">',
	  template:{271:'<div class="bottomSpace"></div><a href="{{url}}"><div class="rightSection"><img src="{{image_url}}"></div><div class="leftSection"><div class="details"><div class="header">{{title}}</div><div class="detailsLine"><span class="title" >תת דגם:</span><span>{{payment_small}}</span></div><div class="detailsLine"><span class="title" >שנה:</span><span>{{shipping}}</span></div><div class="detailsLine"><span class="title" >יד:</span><span>{{rating}}</span></div></div><div class="detailsBottom"><div class="priceBox"><span>מחיר:</span><span class="priceTxt" style="direction: rtl">{{subtitle}}</span></div><div class="arrow">&raquo;</div></div></div></a>'},
	  endHtml:'</div>',
	  openNew: true,
	  MAX_RESULTS:5
	},
	'winwin-home':{
		finalHtml:'<div class="ex-container">',
		template:{
            535:'<div class="bottomSpace"></div><a href="{{url}}"><div class="rightSection"><img src="{{image_url}}"></div><div class="leftSection"><div class="details"><div class="header">{{title}}</div><div class="detailsLine"><span class="title" >עיר\\ישוב:</span><span>{{shipping}}</span></div><div class="detailsLine"><span class="title" >שטח:</span><span>{{free_data}}</span></div><div class="detailsLine"><span class="title" >כניסה:</span><span>{{payment_small}}</span></div></div><div class="detailsBottom"><div class="priceBox"><span>מחיר:</span><span class="priceTxt" style="text-align: center; width: 116px; right:0px; direction: rtl" >{{subtitle}}</span></div><div class="arrow">&raquo;</div></div></div></a>',
            534:'<div class="bottomSpace"></div><a href="{{url}}"><div class="rightSection"><img src="{{image_url}}"></div><div class="leftSection"><div class="details"><div class="header">{{title}}</div><div class="detailsLine" style="height:8px;"></div><div class="detailsLine">{{payment}}</div><div class="detailsLine" style="direction: rtl">{{subtitle}}</div><div class="detailsLine" style="height:8px;"></div></div><div class="detailsBottom"><div class="priceBox"><span>מחיר:</span><span class="priceTxt" style="text-align: center; width: 80px;">נדל"ן חדש</span></div><div class="arrow">&raquo;</div></div></div></a>',
            271:'<div class="bottomSpace"></div><a href="{{url}}"><div class="rightSection"><img src="{{image_url}}"></div><div class="leftSection"><div class="details"><div class="header">{{title}}</div><div class="detailsLine"><span class="title" >תת דגם:</span><span>{{payment_small}}</span></div><div class="detailsLine"><span class="title" >שנה:</span><span>{{shipping}}</span></div><div class="detailsLine"><span class="title" >יד:</span><span>{{rating}}</span></div></div><div class="detailsBottom"><div class="priceBox"><span>מחיר:</span><span class="priceTxt" style="direction: rtl">{{subtitle}}</span></div><div class="arrow">&raquo;</div></div></div></a>'
        },
		endHtml:'</div>',
		openNew: true,
		MAX_RESULTS:4
	},
    'baligam-shop':{
        finalHtml:'<br><div id="sale"><section id="products"><div class="title" style="font-size:18px;">עוד מוצרים בול בשבילך:</div><div class="row">',
        template:'<div class="pull-right span4"><a class="product" href="{{url}}"><div class="main"><div class="image-holder" style="background: url({{image_url}}) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; -ms-behavior: url(http://www.baligam.co.il/backgroundsize.min.htc);"></div><div class="h1">{{title}}</div><div class="h2">{{subtitle}}</div><div class="h3"><span class="price">{{price}}  <span class="instead-of"><span class="original-price">{{shipping}}</span></span></span></div><div class="red-arrow arrow-icon arrow-left"></div></div></a></div>',
        endHtml:'</div></section></div>',
        MAX_RESULTS:3
    },
    'ex':{
        finalHtml:'<div>',
        template: '<a href="{{url}}" target="_blank"><img src="{{image_url}}" style="border-width:0px;"></a>',
        endHtml: '</div>',
        openNew: true,
        MAX_RESULTS:1
    },
    'alljobs':{
        finalHtml:'<div class="FloatR TBR"></div><div class="FloatR TBC"></div><div class="FloatR TBL"></div>'+
            '<div class="AR W576 BoxLineRight Clear Relative">'+
            '<div class="Absolute R1 T12 White B H25" style="width:233px; background:url(/images/HomePage/BoxHPTitleC.jpg);background-repeat:repeat-x;top:-3px"><div class="PR8 PT3">גולשים שצפו במשרה זו התעניינו במשרות אלו</div></div>'+
            '<div class="Absolute" style="top:-3px;right:233px"><img src="/images/HomePage/BoxHPTitleL.jpg" alt=""></div>'+
            '<div class="Clear LH1"></div>'+
            '<div class="BoxLineLeft W576">'+
            '<div class="W576 BoxBackgroundBottom">'+
            '<div class="PB20 PR10 MR1 ML1 PT20" style="width:548px;">'+
            '<div style="text-align: right; direction: rtl; color: #555555; margin-right: 5px; margin-left: 5px; padding-bottom: 5px;">',
        template:'<a href="{{url}}" target="_top"><div style="padding-top: 6px;  padding-right: 10px;  padding-bottom: 1px;  padding-left: 10px; border-bottom: solid 1px #F8F8F8; overflow:hidden;"><img src="http://s3-eu-west-1.amazonaws.com/leucon/thread_new.gif" style="float:right; border:0;"><div style="float:right;padding: 4px 10px;white-space: nowrap;width: 80%;text-overflow: ellipsis;overflow: hidden;"><b>{{title}}</b><br><span style="font-size: 11px;">{{subtitle}}</span></div></div></a>',
        endHtml:'</div>'+
            '<div class="Absolute R0 B0"><img src="/images/HomePage/RightBarBottomRight.jpg" alt=""></div><div class="Absolute L0 B0"><img src="/images/HomePage/RightBarBottomLeft.jpg" alt=""></div>'+
            '</div></div></div></div><div class="Clear LH1 PB20"></div></div>',
        MAX_RESULTS:4,
        urlParser: function(url)
        {
            return url.split('&')[0].split('#')[0];
        },
        categoryParser: function()
        {
            return Exposebox.jQuery('.L_Gray5f5f5f')[0].title;
        },
        getTitle: function()
        {
            return Exposebox.jQuery('.Gray5f5f5f')[0].title;
        },
        isOpen: function()
        {
            if( !(Exposebox.jQuery('.PT6.Red').html()==='משרה זו סומנה ע"י המעסיק כלא אקטואלית יותר.'))
                return 'T';
            else
                return 'F';
        }
    }
}