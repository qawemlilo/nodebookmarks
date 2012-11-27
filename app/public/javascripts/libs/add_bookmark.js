/*
****************************************************
COPYRIGHT © 2011 Raging Flame
AUTHOR: Qawelesizwe Mlilo
Email: qawemlilo@gmail.com
****************************************************
*/

(function (window) {
    function saveBookmark (url) {
        var js = document.createElement('script');
        
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);
        
        document.getElementsByTagName('head')[0].appendChild(js);
    }

    window.echoMessage = function (obj) {
        var msgBox = document.createElement('div'), msgBoxStyle = msgBox.style; 
        
        msgBoxStyle.position = 'absolute';
        msgBoxStyle.height = '20px';
        msgBoxStyle.top = '50%';
        msgBoxStyle.left = '50%';
        msgBoxStyle.margin = '-30px 0px 0px -195px';
        msgBoxStyle.backgroundColor = '#f7f7f7';
        msgBoxStyle.border = '1px solid #ccc';
        msgBoxStyle.color = '#777';
        msgBoxStyle.padding = '20px';
        msgBoxStyle.fontSize = '16px';
        msgBoxStyle.fontFamily = '"Myriad Pro",Arial,Helvetica,sans-serif';
        msgBoxStyle.textAlign = 'center';
        msgBoxStyle.zIndex = 100000;
        msgBoxStyle.textShadow = '1px 1px 0 white';
        msgBoxStyle.borderRadius = "12px";
        msgBoxStyle.boxShadow = '0 0 6px #ccc';
        
        msgBox.setAttribute('onclick','document.body.removeChild(this)');
        msgBox.appendChild(document.createTextNode(obj.msg));
        document.body.appendChild(msgBox);
        
        setTimeout(function () {
            try {
			    document.body.removeChild(msgBox);
            } catch (error) {}
	    }, 3000);
    };
    
    saveBookmark('http://localhost:3003/bookmark?callback=echoMessage&url='+encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title));  
}(window));