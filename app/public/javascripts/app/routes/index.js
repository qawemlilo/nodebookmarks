/*

*/
define(function() {
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
            
            'devs': 'loadDevsPage',
            
            'privacy': 'loadPrivacyPage'
        },
        
        
        
        initialize: function (app) {
            this.app = app;
        },
        
        
        
        loadLogin: function (error) {
            var self = this;
            
            $('#app-body').fadeOut(function () {
                self.app.views.login.render();
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.login').addClass('active');
                $('#app-body').fadeIn();    
                if (error) {
                    $.shout('Invalid email / password combination',  10);
                }
            });
        },
        
        
        
        loadRegister: function () {
            var self = this;
            
            $('#app-body').fadeOut(function () {
                self.app.views.register.render();
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.home').addClass('active');
                $('#app-body').fadeIn(); 
            });
        },
        
        
        loadDevsPage: function () {
            var self = this;
            
            $('#app-body').fadeOut(function () {
               self.app.views.pages.render('devs');
                $('.nav-pills li.active').removeClass('active');
                $('#app-body').fadeIn(); 
            });
        },
        
        
        loadPrivacyPage: function () {
            var self = this;
            
            $('#app-body').fadeOut(function () {
                self.app.views.pages.render('privacy');
                $('.nav-pills li.active').removeClass('active');
                $('#app-body').fadeIn(); 
            });
        }
    });
    
    return Router;
});
