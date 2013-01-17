/*
    @Module: App.Views.Controller - initializes application views
*/
define(['libs/underscore', 'libs/backbone', 'models/bookmark'], function (_, Backbone, Bookmark) {
    "use strict";
    
    var Controller = Backbone.View.extend({

        el: $('#app-body'),

        profile: {},

        activeView: '',

        bookmarks: {},

        controls: {},

        pagination: {},


        
        
        /*
            @Constructor - initializes app views 
        */
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, 'loadAccount', 'newBookmarkView', 'filterTags', 'loadBookmarks', 'goTo', 'assign');

            self.$('#profile').hide();
            
            self.app =opts.app;
            
            self.controls = self.app.views.controls;
            self.bookmarks = self.app.views.bookmarks;
            self.profile = self.app.views.p;
            self.pagination = self.app.views.pagination;
            
            self.bookmarks.collection.pager();
            
            self.assign({
                '#profile': self.app.views.profile
                '#controls': self.app.views.controls, 
                '#bookmarks-table': self.app.views.bookmarks,
                '#pagination': self.app.views.pagination
            });
            
            return self;
        },

        
        
        
        /*
            This method loads the account view
            The router calls this method when the location hash changes to #user/account
        */
        loadAccount: function () {
            var self = this;
            
            self.$('.app-elem').fadeOut().promise().done(function () {
                self.$('#profile').fadeIn();
                self.activeView = 'profile';
            });
        },
        

        
        
        /*
            This method loads the Bookmarklet view
        */
        loadBookmarklet: function () {
            var self = this;
            
            self.$('.app-elem').fadeOut().promise().done(function () {
                self.$('#bookmark-links').fadeIn();
                self.activeView = 'bookmarklet';
            });
        },

        
        

        /*
            This method loads the Bookmarks view. 
        */        
        loadBookmarks: function () { 
            var self = this;
            
            if (self.activeView === 'profile' || self.activeView === 'bookmarklet') {
            
                $('.app-elem').fadeOut().promise().done(function () {
                    self.pagination.reset(function () {
                        $('.home-div').fadeIn();
                    });
                    self.activeView = 'home';
                }); 
            }
            else {
                self.pagination.reset(function () {
                    $('.home-div').fadeIn();
                });
                self.activeView = 'home';
            }
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
        

        
        

        /*
            This method loads and displays a page of bookmarks
            @param: (Number) num - pagination number
        */        
        goTo: function (num) {
            this.pagination.gotoPage(num);              
        },
        

        
        

        /*
            This method filters and displays bookmarks containing a tag
            @param: (String) tag - tag to be filtered
        */         
        filterTags: function (tag) {
            this.controls.filterTags(tag);
            this.activeView = 'filteredTags';              
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
