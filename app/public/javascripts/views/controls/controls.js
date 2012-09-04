/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, models, $) {
"use strict";
    views.Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        controlsTemplate: new EJS({url: '/javascripts/views/controls/tmpl/controls.ejs'}),
        
        
        events: {
            'click .btn-group .new-bookmark': 'newBookmark',
            'click .btn-group .limit a': 'changeCount',
            'click .btn-group .sort a': 'sort'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render');
        },
        

        render: function () {
            var controlsTemplate, tags = this.collection.getTags();

            controlsTemplate = this.controlsTemplate.render({tags: tags, filteredTag: this.collection.filteredTag}); 
            this.$el.html(controlsTemplate);
            
            return this;
        },
        
        
        newBookmark: function (e) {
            e.preventDefault();
            /*
            var model = new models.NewBookmark();
            
            views.Bookmarks.newBookmark(model);
            */
        },
        
        
        changeCount: function (e) {
            e.preventDefault();
            var num = $(e.target).text();
             
            views.Pagination.changeCount(num);
        },
        
        sort: function (e) {
            e.preventDefault();
            
            var classname = $(e.target).attr('class');
            
            if (classname !== this.collection.sortOrder)
                this.collection.changeSortOder(classname);
        }
    });
}(App.Views, App.Models, jQuery));
