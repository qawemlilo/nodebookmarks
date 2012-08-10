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
            App.Views.Settings = new App.Views.Settings();
            App.Views.Bookmarks = new App.Views.Bookmarks();
        }
        
        Backbone.history.start();
    },
    
    
    Views: {},
    
    
    Routes: {},
    
    
    Models: {},
    
    
    Collections: {}
};