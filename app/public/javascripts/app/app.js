/*
    App - application namespace.
*/
define(['libs/backbone'], function (Backbone) {
    "use strict";

    var App = {
    
        init: function (page, bookmarks) {
            var index, controller;
            
            App.page = page;
        },
    
    
        Views: {},
    
    
        Routes: {},
    
    
        Models: {},
    
    
        Collections: {}
    };
  
    return App;
    
});