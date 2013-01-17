/*
    App - application namespace.
*/
define(['views/register', 'views/login', 'views/pages', 'views/bookmarks', 'views/controls', 'views/profile', 'views/pagination', 'routes/index', 'routes/router', 'libs/fancybox/fancybox'], 
  function (Register, Login, Pages, Bookmarks, Controls, Profile, Pagination, Index, Router) {

    var App = {
    
        views: {},
        
        
        models: {},
        
        
        collections: {},
        
        
        init: function (page, books) {
            var index, controller, router, self = this;
            
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
                
                
                self.views.bookmarks = new Bookmarks({
                    collection: books
                });
                    
                self.views.controls = new Controls({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.profile = new Profile({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pagination = new Pagination({
                    app: self,
                    collection: self.views.bookmarks.collection
                });
                
                self.views.pages = new Pages();
            }
            
            Backbone.history.start();
        }
    };
  
    return App;
    
});