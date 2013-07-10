/*
    App - application namespace.
*/
define([
    'views/register', 
    'views/login', 
    'views/pages', 
    'views/profile', 
    'views/bookmarks', 
    'views/controls', 
    'views/pagination', 
    'views/controller', 
    'views/home', 
    'routes/index', 
    'routes/router', 
    'collections/bookmarks'
], function (registerView, loginView, pagesView, profileView, bookmarksView, controlsView, paginationView, Controller, homeView, indexRouter, bookmarksRouter, BookmarksCollection) {

    var App = {
    
        views: {},
        
        
        models: {},
        
        
        collections: {},
        
        
        init: function () {
            if (!window.bookmarkmanager) {
                return false;
            }
            
            var self = this,
                page = window.bookmarkmanager.page,
                bookmarks = window.bookmarkmanager.bookmarks,
                user = window.bookmarkmanager.user,
                router;
            
            self.page = page;

            
            if (page === 'index') {
                router = new indexRouter(self);
                
                self.views.register = new registerView({
                    app: self
                });
                    
                self.views.login = new loginView({
                    app: self
                });
                
                self.views.pages = new pagesView();
            }
            
            if (page === 'home' || page === 'demo') {
                router = new bookmarksRouter(self);
                
                self.views.profile = new profileView({
                    app: self,
                    user: user
                });
                
                self.views.bookmarks = new bookmarksView({
                    collection: new BookmarksCollection(bookmarks),
                    app: self
                });
                
                self.views.controls = new controlsView({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pagination = new paginationView({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pages = new pagesView();
                
                self.views.home = new homeView({
                    app: self
                });

                self.views.controller = new Controller({
                    app: self
                });               
            }
            
            Backbone.history.start();
        }
    };
  
    return App;
    
});