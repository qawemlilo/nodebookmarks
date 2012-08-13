/*
    @App - application namespace
*/
var App = {

    init: function (page) {
        new App.Routes.AppRouter(); 
        
        if (page === 'index') {
            App.Views.Form = new App.Views.Form();
        }
        
        if (page === 'home') {
            var settingsView = new App.Views.Settings(),
                bookmarksView = new App.Views.Bookmarks();
                
            App.Collections.Bookmarks = bookmarksView.collection;
        }
        
        Backbone.history.start();
    },
    
    
    Views: {},
    
    
    Routes: {},
    
    
    Models: {},
    
    
    Collections: {}
};