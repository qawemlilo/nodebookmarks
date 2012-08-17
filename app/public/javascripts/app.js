
/*
    @App - application namespace
*/
var App = {

    init: function (page, bookmarks) {
        new App.Routes.AppRouter(); 
        
        if (page === 'index') {
            App.Views.Form = new App.Views.Form();
        }
        
        if (page === 'home') {
            App.Views.Settings = new App.Views.Settings();
            
            var bookmarksView = new App.Views.Bookmarks();

            bookmarksView.collection.add(bookmarks[0]);
        }
        
        Backbone.history.start();
    },
    
    
    Views: {},
    
    
    Routes: {},
    
    
    Models: {},
    
    
    Collections: {}
};