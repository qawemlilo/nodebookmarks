/*
    Controls view                
*/
define(['../models/bookmark', 'text!templates/controls.html'], function (Bookmark, controlsTemplate) {
    "use strict";
    
    var Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        
        
        controlsTemplate: _.template(controlsTemplate),
        
        
        
        
        
        events: {
            'click #new-bookmark-form .cancel': 'clearNewBookmark',
            
            'click .btn-group .limit a': 'changeCount',
            
            'click .btn-group .sort a': 'sort'
        },
        
        
        
        
        
        
        initialize: function (opts) {
            _.bindAll(this, 'render', 'clearNewBookmark');
            
            this.app = opts.app;
        },
        
        
        
        
        

        /*
            Loads template and renders controls view
        */          
        render: function () {
            var template, self = this, tags = self.collection.getTags();
            
            tags.sort();

            template = self.controlsTemplate({tags: tags, filteredTag: self.collection.filteredTag}); 
            self.$el.html(template);
            
            return self;
        },
        
        
        
        
        filterTags: function (tag) {
            var self = this;
            
            //We want to check if we are on the latest page and if its not of 
            // some filtered models
            if (tag) {
                $.shout('Loading "' + tag + '" bookmarks.....', 0, 'info');
                
                self.collection.fetch({
                    data: {
                        skip: self.collection.info().totalRecords,
                        tag: tag
                    }, 
                    
                    type: 'GET', 
                    
                    success: function(collection, result, opts) {
                        if (result.length > 0) {
                            $.shout('Done!', 2, 'info');
                            _.each(result, function (model) {
                                var bookmark = new Bookmark(model);
                            
                                self.collection.origModels.push(bookmark);
                            });
                            
                            self.collection.filterTags(tag);
                            self.render();
                        }
                        else {
                            $.shout('Done!', 2, 'info');
                            self.collection.filterTags(tag);
                            self.render();                            
                        }
                    },
                    
                    error: function(collection, xhr, options) {
                        $.shout('Request failed!', 5, 'warning');
                    }
                });
            }             
        },
        
        
        


        /*
            Handles click events for changing limit of displayed bookmarks per page
            @Param: (Object) e - click event object
        */          
        changeCount: function (e) {
            e.preventDefault();
            var num = $(e.target).text();
             
            this.app.views.pagination.changeCount(num);
        },
        
        
        clearNewBookmark: function (e) {
            e.preventDefault();
            
            $('#new-bookmark-table').fadeOut(function () {
                $('#new-bookmark-table').remove();
                $('#bookmarks-table, #pagination').fadeIn();
            });
        },
        


        /*
            Handles click events for changing display order of bookmarks
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
    
    return Controls;
});
