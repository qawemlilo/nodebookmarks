requirejs.config({
    baseUrl: 'javascripts/app',
    
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
            deps: ['libs/underscore', 'libs/backbone', 'libs/pagination','libs/script']
        }
    }
});

require(["app"], function(App) {  
    $(function() {
        window.App = App;
        App.init(page, []);
    });
});
