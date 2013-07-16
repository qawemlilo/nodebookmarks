/*
    @Module: App.Views.Controller - initializes application views
*/
define(['models/bookmark'], function (Bookmark) {
    "use strict";
    
    var Controller = Backbone.View.extend({

        el: $('#app-body'),

        
        appView: '',
        
        
        /*
            @Constructor - initializes app views 
        */
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, '_changeActive', 'loadPage', 'loadAccount', 'newBookmarkView', 'filterTags', 'loadBookmarks', 'goTo', 'assign');
            
            self.app = opts.app;
            self.app.collections.Bookmarks = self.app.collections.bookmarks = self.app.views.bookmarks.collection;
            
            self.$el.fadeOut(function () {
                self.app.views.home.render();
                 self.$el.fadeIn(); 
            });
            
            return self;
        },

        
        
        loadAccount: function () {
            var self = this;
            
            self.$el.fadeOut(function () {
                self.app.views.profile.render();
                self._changeActive('account');
                self.appView = 'account';
                self.$el.fadeIn(); 
            });
        },
        
        
        
        
        goTo: function (num) {
            var self = this;
            
            self.$el.fadeOut(function () {
                self.app.views.pagination.gotoPage(num);
                self._changeActive('bookmarks');
                self.$el.fadeIn(); 
            });
        },
        
        
        
        
        loadBookmarks: function () {
            var self = this;
            
             self.$el.fadeOut(function () {
                if (self.appView === 'tags') {
                    self.app.views.pagination.reset();
                    self.appView = 'bookmarks';
                }
                else {
                    self.app.views.home.render();    
                }
                self._changeActive('bookmarks');
                self.$el.fadeIn(); 
            });        
        },
        
        
        
        
        filterTags: function (tag) {
            var self = this;
            
            self.$el.fadeOut(function () {
                self.app.views.controls.filterTags(tag);
                self.appView = 'tags';
                self._changeActive('bookmarks');
                self.$el.fadeIn(); 
            });
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
                self.appView = 'pages';
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
                self.appView = 'newbookmark';
                self.app.views.bookmarks.newBookmark(model);
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
