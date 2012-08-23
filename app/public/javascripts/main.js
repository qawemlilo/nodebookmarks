/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Collections, $) {
"use strict";
    Views.App = Backbone.View.extend({
    
        el: $('#app-body'),
        
        
        router: {},
        
        
        settings: {},
        
        
        activeView: '',
                
        
        user: {},
        
        
        bookmarks: {},
        
        
        controls: {},
        
        
        initialize: function () {
            _.bindAll(this, 'loadSettings', 'filterTags', 'reset', 'loadBookmarks', 'goTo', 'assign');
            
            this.$('#bookmarks-table, #settings').hide();
            
            this.router = new App.Routes.Router();
            
            this.controls = new Views.Controls();
            this.bookmarks = new Views.Bookmarks();
            this.settings = new Views.Settings();
            
            this.settings.user = this.user;
            
            Views.Controls = this.controls;
            Views.Bookmarks = this.bookmarks;
            Views.Settings = this.settings;
            
            this.bookmarks.collection.add(this.collection);
            
            var pages = (this.bookmarks.collection.models.length / this.bookmarks.limit);
            
            this.pages = new Views.Pages();
            this.pages.pages = pages;
            
            this.assign({
                '#settings': this.settings,
                '#controls': this.controls, 
                '#bookmarks-table': this.bookmarks,
                '#pagination': this.pages
            });
            
            return this;
        },

        
        loadSettings: function () {
            this.$('#bookmarks-table, #controls').fadeOut(function () {
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
                this.$('#bookmarks-table').empty();
                this.bookmarks.collection.forEach(this.bookmarks.addBookmark);
                this.$('#bookmarks-table, #controls').fadeIn();
                this.activeView = 'home';
            }.bind(this));
            
            return this;
        },
        
        
        loadBookmarks: function () {
            if (this.activeView === 'tags') {
                this.reset();
                return;
            }
            
            this.$('#settings').fadeOut(function () {
                this.$('#controls, #bookmarks-table').fadeIn();
                this.activeView = 'home';
            }.bind(this));
            
            return this;
        },
        
        
        goTo: function (num) {
            this.bookmarks.goTo(num);              
        },
        
        
        filterTags: function (tag) {
            this.$('#bookmarks-table').fadeOut(function () {
               this.bookmarks.filterTags(tag);
               this.$('#bookmarks-table').fadeIn();
               this.activeView = 'tags';
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
}(App.Views, App.Collections, jQuery));
