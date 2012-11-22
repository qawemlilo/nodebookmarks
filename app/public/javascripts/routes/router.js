/*
    @Module: Routes::Router - handles app navigation
*/
(function(views, routes) {
    "use strict";
    
    routes.Router = Backbone.Router.extend({
        routes: {
            'bookmarks': 'loadBookmarks',
            
            '': 'loadBookmarks',
            
            'user/account': 'loadProfile',
            
            'tags/:tag': 'filterTags',
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBook'
        },
        
        
        loadProfile: function () {
            views.Controller.loadProfile(); 
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
        },
        
        
        loadBookmarks: function () {
            views.Controller.loadBookmarks(); 
        },
        
        
        newBook: function () {
            views.Controller.newBook(); 
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag);              
        }
    });
}(App.Views, App.Routes));
