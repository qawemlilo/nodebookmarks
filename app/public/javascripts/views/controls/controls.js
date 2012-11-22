/*
    @Module: App.Views.Controls - renders application controls/menu
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore                  
                  - EJS                  
*/
(function (Backbone, views, Template, $) {
    "use strict";
    
    views.Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        controlsTemplate: new Template({url: '/javascripts/views/controls/tmpl/controls.ejs'}),
        
        
        newBookmarkTemplate: new Template({url: '/javascripts/views/controls/tmpl/new.ejs'}),
        
        
        events: {
            'click #new-bookmark-form .cancel': 'clearNewBookmark',
            
            'click .btn-group .limit a': 'changeCount',
            
            'click .btn-group .sort a': 'sort'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render', 'clearNewBookmark');
        },
        

        /*
            @Public
            @Void: loads template and renders controls view
        */          
        render: function () {
            var controlsTemplate, tags = this.collection.getTags();

            controlsTemplate = this.controlsTemplate.render({tags: tags, filteredTag: this.collection.filteredTag}); 
            this.$el.html(controlsTemplate);
            
            return this;
        },
        


        /*
            @Private
            @Void: handles click events for changing limit of displayed bookmarks per page
            @Param: (Object) e - click event object
        */          
        changeCount: function (e) {
            e.preventDefault();
            var num = $(e.target).text();
             
            views.Pagination.changeCount(num);
        },
        
        
        clearNewBookmark: function (e) {
            e.preventDefault();
            
            $('#new-bookmark-table').fadeOut(function () {
                $('#new-bookmark-table').remove();
                $('#bookmarks-table, #pagination').fadeIn();
            });
        },
        


        /*
            @Private
            @Void: handles click events for changing display order of bookmarks
            @Param: (Object) e - click event object
        */        
        sort: function (e) {
            e.preventDefault();
            
            var classname = $(e.target).attr('class');
            
            if (classname !== this.collection.sortOrder) {
                this.collection.changeSortOder(classname);
            }
        }
    });
}(Backbone, App.Views, EJS, jQuery));
