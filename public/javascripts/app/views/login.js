/*
    Registration form view                  
*/
define(['text!templates/login/login.html'], function(loginTemplate) {
    "use strict";
    
    var Login = Backbone.View.extend({
    
        el: $('#content-body'),
        
        
        loginTemplate: _.template(loginTemplate),
        
        
        initialize: function (obj) {
            this.app = obj.app;
            
            _.bindAll(this, 'render');

            return this;
        },
        


        /*
            Renders form
        */           
        render: function () {
            var self = this, template = self.loginTemplate({});
            
            self.$el.html(template);
            
            return self;
        }         
    });
    
    return Login;
});
