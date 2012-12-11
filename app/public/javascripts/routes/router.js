/*
    This is the router handles app navigation for logged in user.
    The router also handles highlighting the currently active menu
*/
(function(views, routes) {
    "use strict";
    
    routes.Router = Backbone.Router.extend({
    
    
        routes: {
            'bookmarks': 'loadBookmarks',
            
            '': 'loadBookmarks',
            
            'user/account': 'loadAccount',
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark',
            
            'bookmarks/bookmarklet': 'loadBookmarklet'
        },
        
        
        
        
        loadAccount: function () {
            views.Controller.loadAccount();
            this._changeActive('account');
        },
        
        
        
        
        loadBookmarklet: function () {
            views.Controller.loadBookmarklet();
            this._changeActive('bookmarklet');
        },
        
        
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
            this._changeActive('bookmarks');
        },
        
        
        
        
        loadBookmarks: function () {
            views.Controller.loadBookmarks();
            this._changeActive('bookmarks');               
        },
        
        
        newBookmark: function () {
            views.Controller.newBookmarkView();
            this._changeActive('bookmarks');
        },
        
        
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag);
            this._changeActive('bookmarks');
        },
        
        
        
        
        _changeActive: function (current) {
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.' + current).addClass('active');
            }        
        }
    });
}(App.Views, App.Routes));
