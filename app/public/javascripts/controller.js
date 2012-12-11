/*
    @Module: App.Views.Controller - initializes application views
*/
(function (Backbone, models, views, collections, routes, $) {
    "use strict";
    
    views.Controller = Backbone.View.extend({
    
    
    
        el: $('#app-body'),
        
        
        
        
        router: {},
        
        
        
        
        profile: {},
        
        
        
        
        activeView: '',
        
        
        
        
        bookmarks: {},
        
        
        
        
        controls: {},
        
        
        
        
        pagination: {},


        
        
        /*
            @Constructor - initializes app views 
        */
        initialize: function () {
            _.bindAll(this, 'loadAccount', 'newBookmarkView', 'filterTags', 'loadBookmarks', 'goTo', 'assign');

            this.$('#profile').hide();

            this.router = new routes.Router();
            
            this.bookmarks = new views.Bookmarks({
                collection: new collections.Bookmarks(this.collection)
            });
            
            this.controls = new views.Controls({
                collection: this.bookmarks.collection
            });
            
            this.pagination = new views.Pagination({
                collection: this.bookmarks.collection
            });
            
            this.profile = new views.Profile(); 
            
            
            views.Controls = this.controls;
            views.Bookmarks = this.bookmarks;
            views.Profile = this.profile;
            views.Pagination = this.pagination;
            collections.Bookmarks = this.bookmarks.collection;

            
            this.bookmarks.collection.pager();
            
            this.assign({
                '#profile': this.profile,
                '#controls': this.controls, 
                '#bookmarks-table': this.bookmarks,
                '#pagination': this.pagination
            });
            
            return this;
        },

        
        
        
        /*
            This method loads the account view
            The router calls this method when the location hash changes to #user/account
        */
        loadAccount: function () {
            this.$('.app-elem').fadeOut().promise().done(function () {
                this.$('#bookmarks-table').empty();
                this.$('#profile').fadeIn();
                this.activeView = 'profile';
            }.bind(this));
        },
        

        
        
        /*
            This method loads the Bookmarklet view
        */
        loadBookmarklet: function () {
            this.$('.app-elem').fadeOut().promise().done(function () {
                this.$('#bookmarks-table').empty();
                this.$('#bookmark-links').fadeIn();
                this.activeView = 'bookmarklet';
            }.bind(this));
        },

        
        

        /*
            This method loads the Bookmarks view. 
        */        
        loadBookmarks: function () {            
            if (this.activeView === 'profile' || this.activeView === 'bookmarklet') {
            
                $('.app-elem').fadeOut().promise().done(function () {
                    this.pagination.reset(function () {
                        $('.home-div').fadeIn();
                    });
                    this.activeView = 'home';
                }.bind(this)); 
            }
            else {
                this.pagination.reset(function () {
                    $('.home-div').fadeIn();
                });
                this.activeView = 'home';
            }
        },
        
 

 
        /*
            This method loads the new bookmark view by creating new Bookmark model outside the bookmarks collection 
        */ 
        newBookmarkView: function () {
            var self = this,  model;
            
            $('#pagination').fadeOut(function () {
                model = new models.Bookmark();
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
}(Backbone, App.Models, App.Views, App.Collections, App.Routes, jQuery));
