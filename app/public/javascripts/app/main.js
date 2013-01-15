requirejs.config({
    baseUrl: 'javascripts/app',
    
    paths: {
        'text': 'libs/text',
        
        'underscore': 'libs/underscore',
        
        'backbone': 'libs/backbone',
        
        'templates': 'templates',
        
        'views': 'views',
        
        'models': 'models',
        
        'collections': 'collections'
    },
    
    shim: {
        'libs/underscore': {
            exports: '_'
        },
        
        'libs/backbone': {
            deps: ['libs/underscore'],
            
            exports: 'Backbone'
        },
        
        'app': {
            deps: ['views/bookmark', 'models/bookmark']
        }
    }
});

require(["app"], function(App) {  
    $(function() {
        window.App = App;
        App.init('home', []);
    });
});
