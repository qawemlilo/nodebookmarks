/*
    @Module: Routes::Router - handles app navigation
*/
(function(views, routes) {
    "use strict";
    
    routes.Router = Backbone.Router.extend({
        routes: {
            'index': 'loadHome',
            
            'bookmarks': 'loadHome',
            
            'reset': 'loadHome',
            
            'profile': 'loadProfile',
            
            'tags/:tag': 'filterTags',
            
            'page/:num': 'goTo'            
        },
        
        
        loadProfile: function () {
            views.Controller.loadProfile(); 
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
        },
        
        
        loadHome: function () {
            views.Controller.loadHome(); 
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag);              
        }
    });
}(App.Views, App.Routes));
