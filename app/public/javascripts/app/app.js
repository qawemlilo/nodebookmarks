/*
    App - application namespace.
*/
define(function (require) {
    "use strict";
    
    var Backbone = require('./libs/backbone'), 
    
    App = {
    
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