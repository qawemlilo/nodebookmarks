/*
    @Namespace - application namespace
*/
(function (window, Backbone) {
    "use strict";

    var App = {
       
        init: function (page, bookmarks) {
            var index, controller;
        
            if (page === 'home') {
                controller = new App.Views.Controller({collection: bookmarks});
                App.Views.Controller = controller;
            }
            if (page === 'index') {
                index = new App.Views.Index();
            
                App.Views.Index = index;
            }
        

            Backbone.history.start();
        },
    
    
        Views: {},
    
    
        Routes: {},
    
    
        Models: {},
    
    
        Collections: {}
    };
  
    window.App = App;
}(window, Backbone));