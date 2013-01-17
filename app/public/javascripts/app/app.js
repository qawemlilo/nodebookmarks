/*
    App - application namespace.
*/
define(['views/register', 'views/login', 'views/pages', 'views/profile', 'views/bookmarks', 'views/controls', 'views/pagination', 'views/controller', 'routes/index', 'routes/router', 'collections/bookmarks', 'libs/fancybox/fancybox'], 
  function (Register, Login, Pages, Profile, Bookmarks, Controls, Pagination, Controller, Index, Router, Collection) {

    var App = {
    
        views: {},
        
        
        models: {},
        
        
        collections: {},
        
        
        init: function (page, books) {
            var index, router, self = this;
            
            self.page = page;
            
            if (page === 'index') {
                $.howItWorks();
                
                router = new Index(self);
                
                self.views.register = new Register({
                    app: self
                });
                    
                self.views.login = new Login({
                    app: self
                });
                
                self.views.pages = new Pages();
            }
            
            if (page === 'home' || page === 'demo') {
                router = new Router(self);
                
                self.views.profile = new Profile({
                    app: self
                });
                
                self.views.bookmarks = new Bookmarks({
                    collection: new Collection(books)
                });
                
                self.views.controls = new Controls({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pagination = new Pagination({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pages = new Pages();

                self.views.controller = new Controller({
                    app: self
                });               
            }
            
            Backbone.history.start();
        }
    };
  
    return App;
    
});