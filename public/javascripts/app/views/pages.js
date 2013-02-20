/*
    Registration form view                  
*/
define(['text!templates/pages/devs.html', 'text!templates/pages/privacy.html', 'text!templates/pages/bookmarklet.html'], function(devsTemplate, privacyTemplate, bookmarkletTemplate) {
    "use strict";
    
    var Pages = Backbone.View.extend({
    
        el: $('#content-body'),
        
     
        
        devsTemplate: _.template(devsTemplate),
        
        
        
        privacyTemplate: _.template(privacyTemplate),
        
        
        
        bookmarkletTemplate: _.template(bookmarkletTemplate),
        
        
        
        
        initialize: function () {
            _.bindAll(this, 'render');

            return this;
        },
        


        /*
            Renders form
        */           
        render: function (page) {
            var self =this, template;
            
            if (page === 'privacy') {
                template = self.privacyTemplate({})
            }
            if (page === 'devs') {
                template = self.devsTemplate({})
            }
            if (page === 'bookmarklet') {
                template = self.bookmarkletTemplate({});
            }
            
            self.$el.html(template);
            
            return self;
        }    
    });
    
    return Pages;
});
