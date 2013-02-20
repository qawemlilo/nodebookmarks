/*
    This is the router handles app navigation for logged in user.
    The router also handles highlighting the currently active menu
*/
define(['../libs/underscore', '../libs/backbone'], function(_, Backbone) {
    "use strict";
    
    var Router = Backbone.Router.extend({
    
    
        routes: {
            'bookmarks': 'loadBookmarks',
            
            'user/account': 'loadAccount',
            
            'users/account': 'loadAccount',
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark',
            
            'bookmarks/bookmarklet': 'loadBookmarklet',
            
            'bookmarklet': 'loadBookmarklet',
            
            'devs': 'loadDevsPage',
            
            'privacy': 'loadPrivacyPage'
        },
        
        
        
        initialize: function(app) {
            this.app = app;
        },
        
        
        
        
        loadAccount: function () {
            this.app.views.controller.loadAccount();
        },
        
        
        
        
        loadBookmarklet: function () {
            this.app.views.controller.loadPage('bookmarklet');
        },
        
        
        
        
        goTo: function (num) {
            this.app.views.controller.goTo(num);
        },
        
        
        
        
        loadBookmarks: function () {
            this.app.views.controller.loadBookmarks();  
        },
        
        
        newBookmark: function () {
            this.app.views.controller.newBookmarkView();
        },
        
        
        
        
        filterTags: function (tag) {
            this.app.views.controller.filterTags(tag);
        },
        
        
        loadDevsPage: function () {
            this.app.views.controller.loadPage('devs');
        },
        
        
        loadPrivacyPage: function () {
            this.app.views.controller.loadPage('privacy');
        }
    });
    
    return Router;
});
