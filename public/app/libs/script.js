/*
    Custom functions
*/
(function (window, $) {
    "use strict";
    
    window.trim = function (txt) {
        return txt.replace(/^\s+|\s+$/,'');
    };
    
    
    $.shout = function (msg, x, dclass) {
    
        var elem, displayMsg;
            
        displayMsg = function (message, secs, msgclass) {
            elem = $('<div>', {'id': 'appMessage', 'class': msgclass || 'error', html: message});
            
            elem.click(function () {
                $(this).fadeOut(function () {
                    $(this).remove();
                }.bind(this));
            });
            
            if (secs) {
                setTimeout(function () {
                    elem.click();
                }, secs * 1000);
            }
            
            elem.hide().appendTo('body').slideDown();
        };
        
        if ($("#appMessage").length) {
            $("#appMessage").click();
            
            setTimeout(function () {
                displayMsg(msg, x, dclass);
            }, 1000);
        }
        else {
            setTimeout(function () {
                displayMsg(msg, x, dclass);
            }, 0);
        }
    };
    
    
    $.validateEmail = function (email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        return regex.test(email);
    };
        

    $.validateName = function (name) {
        if ((!name || name.length < 3)) {
            return false;     
        }
            
        return true;
    };
        

    $.validatePassword = function (password) {    
        if (password && password.length < 6) {
            return false; 
        }
            
        return true;
    };
    
    $.howItWorks = function (id) {
        $(id).fancybox({
            'width': '75%',
            'height': '96%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'onStart': function () {}
        });      
    };
    
    window.onerror = function (errorMsg, url, lineNumber) {
        alert(errorMsg + ' ' + lineNumber + ' ' + url);
    };
}(window, jQuery));