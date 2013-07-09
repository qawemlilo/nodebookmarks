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
        var valid = (email.indexOf('@') > 0 && email.indexOf('.') > email.indexOf('@'));
            
        return valid;
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
    
    $.howItWorks = function () {
        $('#how-it-works').fancybox({
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