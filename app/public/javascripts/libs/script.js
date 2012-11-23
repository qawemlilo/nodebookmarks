/*
    Custom functions
*/
(function (window, $) {
    "use strict";
    
    window.trim = function (txt) {
        return txt.replace(/^\s+|\s+$/,'');
    };
    
    
    $.shout = function (msg, x, dclass) {
        if ($("#appMessage").length) {
          $("#appMessage").remove();
        }
            
        var elem = $('<div>', {'id': 'appMessage', 'class': dclass || 'error', html: msg});
            
        elem.click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            }.bind(this));
        });
            
        if (x) {
            setTimeout(function () {
                elem.click();
            }, x * 1000);
        }
            
        elem.hide().appendTo('body').slideDown();
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
    
    window.onerror = function (errorMsg, url, lineNumber) {
        alert(errorMsg + ' ' + lineNumber + ' ' + url);
    };
}(window, jQuery));