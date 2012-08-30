var trim = function(str) {
	return str.replace(/^\s+|\s+$/,'');
};

$.shout = function (msg, x) {
    if ($("#appMessage")) {
        $("#appMessage").fadeOut(function () {
            $("#appMessage").remove();
        });
    }
            
    var elem = $('<div>', {'id': 'appMessage', html: msg});
            
    elem.click(function () {
        $(this).fadeOut(function () {
            $(this).remove();
        }.bind(this));
    });
            
    if (x) {
        setTimeout(function () {
            elem.click();
        }, x * 1000);
    }
            
    elem.hide().appendTo('body').slideDown();
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


