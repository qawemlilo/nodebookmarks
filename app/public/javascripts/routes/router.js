/*
    @Module: Routes::Router - handles app navigation
*/
(function(views, routes) {
    "use strict";
    
    routes.Router = Backbone.Router.extend({
        routes: {
            'bookmarks': 'loadBookmarks',
            
            '': 'loadBookmarks',
            
            'user/account': 'loadAccount',
            
            'tags/:tag': 'filterTags',
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark'
        },
        
        
        loadAccount: function () {
            views.Controller.loadAccount(); 
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
        },
        
        
        loadBookmarks: function () {
            views.Controller.loadBookmarks(); 
        },
        
        
        newBookmark: function () {
            views.Controller.newBookmarkView(); 
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag);              
        }
    });
}(App.Views, App.Routes));
