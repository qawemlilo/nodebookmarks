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
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark'
        },
        
        
        loadAccount: function () {
            views.Controller.loadAccount();
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.account').addClass('active');
            }
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        },
        
        
        loadBookmarks: function () {
            views.Controller.loadBookmarks();

            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active'); 
            }                
        },
        
        
        newBookmark: function () {
            views.Controller.newBookmarkView();
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag); 

            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        }
    });
}(App.Views, App.Routes));
