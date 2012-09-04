/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, collections, routes, $) {
    "use strict";
    
    views.Controller = Backbone.View.extend({
    
        el: $('#app-body'),
        
        
        router: {},
        
        
        settings: {},
        
        
        activeView: '',
        
        
        bookmarks: {},
        
        
        controls: {},
        
        
        pagination: {},
        
        
        initialize: function () {
            _.bindAll(this, 'loadSettings', 'filterTags', 'reset', 'loadBookmarks', 'goTo', 'assign');

            this.$('#bookmarks-table, #settings, #pagination').hide();

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
            
            this.settings = new views.Settings(); 
            
            
            views.Controls = this.controls;
            views.Bookmarks = this.bookmarks;
            views.Settings = this.settings;
            views.Pagination = this.pagination;
            collections.Bookmarks = this.bookmarks.collection;

            
            this.bookmarks.collection.pager();
            
            this.assign({
                '#settings': this.settings,
                '#controls': this.controls, 
                '#bookmarks-table': this.bookmarks,
                '#pagination': this.pagination
            });
            
            return this;
        },

        
        loadSettings: function () {
            this.$('#bookmarks-table, #controls, #pagination').fadeOut(function () {
                this.$('#settings').fadeIn();
                this.activeView = 'settings';
            }.bind(this));
            
            return this;
        },
        
        
        reset: function () {
            if (this.activeView === 'settings') {
                this.$('#settings').hide();
            }
            
            this.$('#bookmarks-table').fadeOut(function () {
                this.$('#bookmarks-table').empty()
                this.pagination.reset();
                this.controls.render();
                this.$('#bookmarks-table, #controls').fadeIn();
                this.activeView = 'home';
            }.bind(this));
            
            return this;
        },
        
        
        loadBookmarks: function () {
            if (this.activeView === 'filteredTags') {
                this.reset();
                return;
            }
            
            this.$('#settings').fadeOut(function () {
                this.$('#controls, #bookmarks-table, #pagination').fadeIn();
                this.activeView = 'home';
            }.bind(this));
            
            return this;
        },
        
        
        goTo: function (num) {
            this.pagination.gotoPage(num);              
        },
        
        
        filterTags: function (tag) {
            this.$('#bookmarks-table').fadeOut(function () {
               this.bookmarks.collection.filterTags(tag);
               this.controls.render();
               this.$('#bookmarks-table').fadeIn();
               this.activeView = 'filteredTags';
            }.bind(this));              
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
}(App.Views, App.Collections, App.Routes, jQuery));
