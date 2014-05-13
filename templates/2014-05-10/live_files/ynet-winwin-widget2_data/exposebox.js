(function() {
    Exposebox = {isReady:false};
    ExposeboxLayout = {isReady:false};
    var protocol = window.location.protocol;
    var server = (protocol==='http:') ? 'sf.exposebox.com' : 'exposebox.blob.core.windows.net';
    var isTest =(window.location.href.indexOf("exposebox=test") > -1);
	var url1 = isTest ? protocol+'//test.'+server+'/widget/exposebox-widget.js' :
        protocol+'//'+server+'/widget/exposebox-widget.js';
	var version1 = '1.42';
	var jb1 = document.createElement('script');
	jb1.type = 'text/javascript';
	jb1.async = true;
	jb1.src = url1 + '?v=' + version1;
	var url2 = isTest ? protocol+'//test.'+server+'/widget/exposebox-layout.js' :
        protocol+'//'+server+'/widget/exposebox-layout.js';
	var version2 = '1.34';
	var jb2 = document.createElement('script');
	jb2.type = 'text/javascript';
	jb2.async = true;
	jb2.src = url2 + '?v=' + version2;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(jb1, s);
	s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(jb2, s);
})();
