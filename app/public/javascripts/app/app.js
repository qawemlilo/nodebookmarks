/*
    App - application namespace.
*/
define(['../routes/router', 'views/bookmarks', 'views/bookmarks', 'views/controls', 'views/pagination', 'views/profile'], function (Router, Bookmarks, Controls, Pagination, Profile) {

    var App = {
    
        init: function (page, bookmarks) {
            var index, controller, router;
            
            
            if(page == 'home') {
                router = new Router();
            }
            else {
            
            }
            App.page = page;

            
            App.Views = {
                Bookmarks: new Bookmarks({
                    collection: bookmarks
                }),
                
                Controls: new Controls({
                    collection: App.Views.Bookmarks.collection
                }),

                Pagination: new Pagination({
                    collection: App.Views.Bookmarks.collection
                }),
                
                Profile: new Profile()
            };
        },
    
    
        Views: {},
    
    
        Models: {},
    
    
        Collections: {}
    };
  
    return App;
    
});