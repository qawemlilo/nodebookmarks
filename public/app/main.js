requirejs.config({
    appDir: "../",
    
    baseUrl: 'app',
    
    paths: {
        text: 'libs/text',
        fancybox: 'libs/fancybox/fancybox'
    },
    
    shim: {
        'libs/underscore': {
            exports: '_'
        },
        
        'libs/backbone-v1': {
            deps: ['libs/underscore'],
            exports: 'Backbone'
        },
        
        'libs/pagination': {
            deps: ['libs/underscore', 'libs/backbone-v1']
        },
        
        'app': {
            deps: ['libs/underscore', 'libs/backbone-v1', 'text', 'fancybox', 'libs/script'],
            exports: 'App'
        }
    }
});

require(["app"], function(App) {  
    $(function() {
        App.init(page, books);
    });
});