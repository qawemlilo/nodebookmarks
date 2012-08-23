var trim = function(str) {
	return str.replace(/^\s+|\s+$/,'');
};
/*
    @App - application namespace
*/

(function (window, Backbone) {
  var App = {

    init: function (page, bookmarks) {
    
        if (page === 'home') {
            var app = new App.Views.App({collection: bookmarks});
            App.Views.App = app;
        }
        if (page === 'index') {
            var form = new App.Views.Form();
            
            App.Views.Form = form;
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


