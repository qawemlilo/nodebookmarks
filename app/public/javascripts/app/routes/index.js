/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
define(['../libs/underscore', '../libs/backbone', function(_, Backbone) {
    "use strict";
    
    var Router = Backbone.Router.extend({
        routes: {
            'user/login': 'loadLogin',
            
            'bookmarks': 'loadLogin',
            
            'user/login/:error': 'loadLogin',
            
            'user/register': 'loadRegister',
            
            'index': 'loadRegister',
            
            'home': 'loadRegister',
            
            '/': 'loadRegister',
            
            '': 'loadRegister'
        },
        
        loadLogin: function (error) {
            $('#register-form, #punch-line').fadeOut(function () {
                $('#login-form').fadeIn();
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.login').addClass('active');
                    
                if (error) {
                    $.shout('Invalid email / password combination',  10);
                }
            });
        },
        
        loadRegister: function () {
            $('#login-form').fadeOut(function () {
                $('#register-form,  #punch-line').fadeIn();
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.home').addClass('active');
            });
        }
    });
    
    return Router;
}(App.Routes));
