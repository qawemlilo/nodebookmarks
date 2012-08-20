var trim = function(str) {
	return str.replace(/^\s+|\s+$/,'');
};
/*
    @App - application namespace
*/

(function (window, Backbone) {
  var App = {

    init: function (page, bookmarks) {
        var bookmarksView, router, controls;
        
        router = new App.Routes.AppRouter(); 
        
        if (page === 'index') {
            App.Views.Form = new App.Views.Form();
        }
        
        if (page === 'home') {
            bookmarksView = new App.Views.Bookmarks();
            bookmarksView.collection.add(bookmarks);
            
            controls = new App.Views.Controls();          
            
            App.Views.Bookmarks = bookmarksView;
            App.Views.Controls = controls;
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


