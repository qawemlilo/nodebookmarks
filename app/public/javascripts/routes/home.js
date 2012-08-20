/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(Views, Routes) {
"use strict";
    Routes.AppRouter = Backbone.Router.extend({
        routes: {
            'settings': 'loadSettings',
            
            'bookmarks': 'loadHome',
            
            'tags/:tag': 'filterTags',
            
            'reset': 'reset',
            
            'index': 'loadHome'
        },
        
        
        loadSettings: function () {
            var settings;
            
            if (!Views.Settings.fired) {
                settings = new Views.Settings();
                Views.Settings = settings;
            }
            else {
                console.log('reloading');
                settings = Views.Settings;
            }
            
            $('#content-body').fadeOut(function () {
                $('#content-body').html(settings.el);
                $('#content-body').fadeIn();
            }); 
        },
        
        loadHome: function () {
            var controls = Views.Controls,
                bookmarks = Views.Bookmarks.viewAllBookmarks();
                
            $('#content-body').fadeOut(function () {
                $('#content-body').empty().append(controls.el).append(bookmarks.el);
                $('#content-body').fadeIn();
            }); 
        },
        
        
        filterTags: function (tag) {
            $(Views.Bookmarks.el).fadeOut(function () {
               Views.Bookmarks.filterTags(tag);
               $(Views.Bookmarks.el).fadeIn();
            });              
        },
        
        
        reset: function (tag) {
            $(Views.Bookmarks.el).fadeOut(function () {
               Views.Bookmarks.viewAllBookmarks();
               $(Views.Bookmarks.el).fadeIn();
            }); 
        }
    });
}(App.Views, App.Routes));
