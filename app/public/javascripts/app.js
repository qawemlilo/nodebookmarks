/*
    @App - application namespace
*/
var App = {

    init: function () {
        var router, form;
        
        router = new App.Routes.AppRouter(); 
        form = new App.Views.Form();
        
        Backbone.history.start();
    },
    
    
    Views: {},
    
    
    Routes: {},
    
    
    Models: {},
    
    
    Collections: {}
};

$(function() {
    App.init(); //initialize app
});