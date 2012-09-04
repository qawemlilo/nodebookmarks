/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(views, routes) {
"use strict";
    routes.Router = Backbone.Router.extend({
        routes: {
            'settings': 'loadSettings',
            
            'bookmarks': 'loadHome',
            
            'tags/:tag': 'filterTags',
            
            'page/:num': 'goTo',
            
            'reset': 'reset',
            
            'index': 'loadHome'
        },
        
        
        loadSettings: function () {
            views.Controller.loadSettings(); 
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
        },
        
        
        loadHome: function () {
            views.Controller.loadBookmarks(); 
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag);              
        },
        
        
        reset: function (tag) {
            views.Controller.reset(); 
        }
    });
}(App.Views, App.Routes));
