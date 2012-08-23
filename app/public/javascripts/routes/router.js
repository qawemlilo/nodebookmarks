/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(Views, Routes) {
"use strict";
    Routes.Router = Backbone.Router.extend({
        routes: {
            'settings': 'loadSettings',
            
            'bookmarks': 'loadHome',
            
            'tags/:tag': 'filterTags',
            
            'reset': 'reset',
            
            'index': 'loadHome'
        },
        
        
        loadSettings: function () {
            Views.App.loadSettings(); 
        },
        
        
        goTo: function (num) {
            Views.App.goTo(num); 
        },
        
        
        loadHome: function () {
            Views.App.loadBookmarks(); 
        },
        
        
        filterTags: function (tag) {
            Views.App.filterTags(tag);              
        },
        
        
        reset: function (tag) {
            Views.App.viewAllBookmarks(); 
        }
    });
}(App.Views, App.Routes));
