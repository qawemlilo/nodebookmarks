/*

*/
define(function() {
    "use strict";
    
    var Router = Backbone.Router.extend({
    
        routes: {
            
            'users/login': 'loadLogin',
            
            'bookmarks': 'loadLogin',
            
            'users/login/:error': 'loadLogin',
            
            'users/login/new': 'loadLoginNewUuser',
            
            'users/register': 'loadRegister',
            
            'bookmarklet': 'loadBookmarkletPage',
            
            'home': 'loadRegister',
            
            '/': 'loadRegister',
            
            'devs': 'loadDevsPage',
            
            'privacy': 'loadPrivacyPage'
        },
        
        
        
        initialize: function (app) {
            this.app = app;
            $.howItWorks('#how-it-works');
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
        
        
        
        loadLoginNewUuser: function () {
            var self = this;
            
            $('#app-body').fadeOut(function () {
                self.app.views.login.render();
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.login').addClass('active');
                $('#app-body').fadeIn(function () {
                    $('#bookmark-links').fadeIn();
                });    
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
        },
        
        
        loadBookmarkletPage: function () {
            var self = this;
            
            $('#app-body').fadeOut(function () {
                self.app.views.pages.render('bookmarklet');
                $('.nav-pills li.active').removeClass('active');
                $('#app-body').fadeIn(); 
            });
        },
        
        
        loadAboutPage: function () {
            $.howItWorks();
        }
    });
    
    return Router;
});
