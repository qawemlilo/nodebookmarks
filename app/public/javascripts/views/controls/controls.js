/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections, $) {
"use strict";
    Views.Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        controlsTemplate: new EJS({url: '/javascripts/views/controls/tmpl/controls.ejs'}),
        
        
        events: {
            'click .btn-group .new-bookmark': 'newBookmark',
            'click .btn-group .limit a': 'changeCount'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render');
        },
        

        render: function () {
            var controlsTemplate, tags = this.collection.getTags();

            controlsTemplate = this.controlsTemplate.render({tags: tags}); 
            this.$el.html(controlsTemplate);
            
            return this;
        },
        
        
        newBookmark: function (e) {
            e.preventDefault();
            
            var model = new Models.Bookmark();
            
            model.setUrl('/bookmarks/add');
            
            Views.Bookmarks.newBookmark(model);
        },
        
        
        changeCount: function (e) {
            e.preventDefault();
            var num = $(e.target).text();
             
            Views.Pagination.changeCount(num);
        }
    });
}(App.Views, App.Models, App.Collections, jQuery));
