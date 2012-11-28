/*
    @Namespace: App - application namespace.
*/

if (!String.prototype.trim) {
    String.prototype.trim = function() {   // 
	    return this.replace(/^\s+|\s+$/g,'');
    };
} 

(function (window, Backbone) {
    "use strict";

    var App = {
    
        /*
            
            @Api:   public   
            @param: (String) page 
            @param: (Array) bookmarks - collection of bookmarks
        */
        init: function (page, bookmarks) {
            var index, controller;
            
            App.page = page;
            
            if (page === 'home' || page === 'demo') {
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