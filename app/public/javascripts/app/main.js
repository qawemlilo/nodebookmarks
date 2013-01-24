requirejs.config({
    appDir: "../",
    
    baseUrl: 'app',
    
    paths: {
        'text': 'libs/text'       
    },
    
    shim: {
        'libs/underscore': {
            exports: '_'
        },
        
        'libs/backbone': {
            deps: ['libs/underscore'],
            exports: 'Backbone'
        },
        
        'libs/pagination': {
            deps: ['libs/underscore', 'libs/backbone']
        },
        
        'app': {
            deps: ['libs/underscore', 'libs/backbone', 'libs/text', 'libs/fancybox/fancybox', 'libs/script'],
            exports: 'App'
        }
    }
});

require(["app"], function(App) {  
    $(function() {
        App.init(page, books);
    });
});