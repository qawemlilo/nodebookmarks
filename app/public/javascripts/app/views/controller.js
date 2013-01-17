/*
    @Module: App.Views.Controller - initializes application views
*/
define(['models/bookmark'], function (Bookmark) {
    "use strict";
    
    var Controller = Backbone.View.extend({

        el: $('#app-body'),

        
        
        /*
            @Constructor - initializes app views 
        */
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, '_changeActive', 'loadPage', 'loadAccount', 'newBookmarkView', 'filterTags', 'loadBookmarks', 'goTo', 'assign');
            
            self.app =opts.app;
            
            self.app.views.bookmarks.collection.pager();
            self.app.collections.Bookmarks = self.app.collections.bookmarks = self.app.views.bookmarks.collection;
            
            self.assign({
                '#controls': self.app.views.controls, 
                '#bookmarks-table': self.app.views.bookmarks,
                '#pagination': self.app.views.pagination
            });
            
            return self;
        },

        
        
        loadAccount: function () {
            var self = this;
            
            self.$el.fadeOut(function () {
                self.app.views.profile.render();
                self._changeActive('account');
                 self.$el.fadeIn(); 
            });
        },
        
        
        
        
        goTo: function (num) {
            this.app.views.pagination.gotoPage(num); 
            this._changeActive('bookmarks');
        },
        
        
        
        
        loadBookmarks: function () {
            var self = this;
            
             self.$el.fadeOut(function () {
                self.app.views.pagination.reset();
                self._changeActive('bookmarks');
                 self.$el.fadeIn(); 
            });           
        },
        
        
        
        
        filterTags: function (tag) {
            this.app.views.controls.filterTags(tag);
            this._changeActive('bookmarks');
        },
        
       
        
        
        loadPage: function (page) {
            var self = this;
            
             self.$el.fadeOut(function () {
                self.app.views.pages.render(page);
                
                if (page === 'bookmarklet') {
                    self._changeActive('bookmarklet');
                }
                else {
                    $('.nav-pills li.active').removeClass('active');
                }
                self.$el.fadeIn(); 
            });
        },
        
        
        
        /*
            This method loads the new bookmark view by creating new Bookmark model outside the bookmarks collection 
        */ 
        newBookmarkView: function () {
            var self = this,  model;
            
            $('.home-div').fadeOut().promise().done(function () {
                model = new Bookmark();
                model = model.createUrlRoot('/bookmarks'); 
            
                self.bookmarks.newBookmark(model);
            });
        },
        
 
 
 

        _changeActive: function (current) {
            if (this.app.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.' + current).addClass('active');
            }        
        },
        
        
        
        
        
        
        assign: function (selector, view) {
            var selectors;
            
            if (_.isObject(selector)) {
                selectors = selector;
            }
            else {
                selectors = {};
                selectors[selector] = view;
            }
            
            if (!selectors) {
                return;
            }
            
            _.each(selectors, function (view, selector) {
                view.setElement(this.$(selector)).render();
            }, this);
        }        
    });
    
    return Controller;
});
