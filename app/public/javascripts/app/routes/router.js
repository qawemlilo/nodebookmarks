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
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark',
            
            'bookmarks/bookmarklet': 'loadBookmarklet'
        },
        
        
        
        initialize: function(app) {
            this.app = app;
        },
        
        
        
        
        loadAccount: function () {
            this.app.views.controller.loadAccount();
            this._changeActive('account');
        },
        
        
        
        
        loadBookmarklet: function () {
            this.app.views.controller.loadBookmarklet();
            this._changeActive('bookmarklet');
        },
        
        
        
        
        goTo: function (num) {
            this.app.views.controller.goTo(num); 
            this._changeActive('bookmarks');
        },
        
        
        
        
        loadBookmarks: function () {
            this.app.views.controller.loadBookmarks();
            this._changeActive('bookmarks');               
        },
        
        
        newBookmark: function () {
            this.app.views.Controller.newBookmarkView();
            this._changeActive('bookmarks');
        },
        
        
        
        
        filterTags: function (tag) {
            this.app.views.controller.filterTags(tag);
            this._changeActive('bookmarks');
        },
        
        
        
        
        _changeActive: function (current) {
            if (this.app.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.' + current).addClass('active');
            }        
        }
    });
    
    return Router;
});
