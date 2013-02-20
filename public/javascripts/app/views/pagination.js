

define(['../models/bookmark', 'text!templates/pagination/pagination.html', '../libs/pagination'], function(Bookmark, paginationTemplate) {
    "use strict";
    
    var Pagination = Backbone.View.extend({
    
        el: $('#pagination'),
        
        
        paginationTemplate: _.template(paginationTemplate),
        
        
        data: {},
        
        
        events: {
            'click a.next': 'gotoNext',
            'click a.prev': 'gotoPrev'
        },
        

        /*
            @Public
            @Constructor: binds collection events
        */        
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, 'render', 'changeCount', 'gotoNext', 'gotoPage', 'gotoPrev');
            
            self.app = opts.app;
            
            self.collection.on('reset', self.render);
            self.collection.on('remove', function (model) {
                self.collection.removeFromOGModels(model.cid);
                self.render();
                self.app.views.controls.render();
            }); 

            return self;            
        },
        
        
        
        
         
         
        /*
            Loads the pagination template and renders it.
            
            @api - public
        */          
        render: function () {
            var self = this, html;
            
            self.data = self.collection.info();
            html = self.paginationTemplate(self.data);
            
            self.$el.html(html).fadeIn();
            
            return self;
        },
        
        
        
        
        
         


        /*
            Loads the previous group of pages in the pagination view
            
            @api - public
            @param: (Object) e - click event object
        */                   
        gotoPrev: function (e) {
            e.preventDefault();
            
            this.collection.previousGroup();
            this.render();
        },
         
         
         
         
         
         
         
         
         


        /*
            Loads the next group of available pages in the pagination view
            
            @api - public
            @param: (Object) e - click event object
        */          
        gotoNext: function (e) {
            e.preventDefault();
             
            this.collection.nextGroup();
            this.render();
        },     





        
         


        /*
            Loads a pagination page and re-renders pagination
            
            @api - public
            @param: (Number) page - the number of the page to go to
        */            
        gotoPage: function (num) {
            var self = this, data;

            //We want to check if we are on the latest page and if its not of 
            // filtered models
            if (num >= self.collection.info().totalPages && !self.collection.allFetched) {
                $.shout('Loading more bookmarks.....', 10, 'info');
                
                data = {
                    skip: self.collection.info().totalRecords
                }
                
                // if there are some filtered tags
                if (self.collection.filteredModels) {
                    data.tag = self.collection.filteredTag; 
                }
                
                self.collection.fetch({
                    data: data, 
                    
                    type: 'GET', 
                    
                    success: function(collection, result, opts) {
                        if (result.length > 0) {
                            $.shout('Done!', 2, 'info');
                            _.each(result, function (model) {
                                var bookmark = new Bookmark(model);
                            
                                self.collection.origModels.push(bookmark);
                            });

                            if (self.collection.filteredModels) {
                                self.collection.filterTags(self.collection.filteredTag);
                            }
                            
                            self.collection.goTo(num);
                        }
                        else {
                            self.collection.allFetched = true;
                            $.shout('All bookmarks have been loaded!', 10, 'info');
                            self.collection.goTo(num);
                        }
                    },
                    
                    error: function(collection, xhr, options) {
                        $.shout('Request failed!', 10, 'warning');
                    }
                });
                
                return;
            }
            
            self.collection.goTo(num);
        },
        
        
        
        
        
        
        
        
        

        /*
            Clears any filtered bookmarks
        */         
        reset: function (fn) {
            this.collection.resetFilteredModels();
            if (fn) {
                fn();
            }
            this.render();
        },

        
        
        
        
        
        
        
        


        /*
            Sets number of bookmarks to be displayed per page and reloads current page
            @Param: (Number) num - the number of bookmarks par page
        */         
        changeCount: function (num) {
            this.collection.setLimit(num);
            location.hash = '#pages/' + this.collection.currentPage;
        }
    });
    
    return Pagination;
});
