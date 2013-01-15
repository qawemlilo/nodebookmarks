/*
    This is the router handles app navigation for logged in user.
    The router also handles highlighting the currently active menu
*/
define(['../libs/underscore', '../libs/backbone', function(_, Backbone) {
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
        
        
        
        
        loadAccount: function () {
            App.Views.Controller.loadAccount();
            this._changeActive('account');
        },
        
        
        
        
        loadBookmarklet: function () {
            App.Views.Controller.loadBookmarklet();
            this._changeActive('bookmarklet');
        },
        
        
        
        
        goTo: function (num) {
            App.Views.Controller.goTo(num); 
            this._changeActive('bookmarks');
        },
        
        
        
        
        loadBookmarks: function () {
            App.Views.Controller.loadBookmarks();
            this._changeActive('bookmarks');               
        },
        
        
        newBookmark: function () {
            App.Views.Controller.newBookmarkView();
            this._changeActive('bookmarks');
        },
        
        
        
        
        filterTags: function (tag) {
            App.Views.Controller.filterTags(tag);
            this._changeActive('bookmarks');
        },
        
        
        
        
        _changeActive: function (current) {
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.' + current).addClass('active');
            }        
        }
    });
    
    return Router;
});
