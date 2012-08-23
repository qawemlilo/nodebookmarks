/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections, $) {
"use strict";
    Views.Pages = Backbone.View.extend({
    
        el: $('#pagination'),
        
        
        pagesTemplate: new EJS({url: '/javascripts/views/pages/tmpl/pages.ejs'}),
        
        
        initialize: function () {
            _.bindAll(this, 'render');
            
            return this;
        },
        

        render: function () {
            var pagesTemplate = this.pagesTemplate.render({pages: this.pages || 1});
                
            this.$el.append(pagesTemplate);
            
            return this;
        }
    });
}(App.Views, App.Models, App.Collections, jQuery));
