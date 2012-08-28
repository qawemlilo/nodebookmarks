/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections, $) {
"use strict";
    Views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        
        
        paginator: {},
        
        
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'goTo', 'filterTags', 'hasTag');
            
            $('.dropdown-toggle').dropdown();
            
            this.collection.on('add', this.addBookmark);
            this.collection.on('reset', this.viewAllBookmarks);
            this.collection.on('remove', function (model) {
                this.collection.updateOrigModels(model.cid);
            }.bind(this));

            Collections.Bookmarks = this.collection;
        },
        
        
        render: function () {
            return this;
        },
        

        addBookmark: function (bookmarkModel) { 
            var bookmarkView = new Views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.el);
        },
        
        
        newBookmark: function (bookmarkModel) {    
            var bookmarkView = new Views.Bookmark({
                model: bookmarkModel
            });
            console.log(bookmarkModel.url);
            this.$el.prepend(bookmarkView.el);
            bookmarkView.loadEditor();
        },
        

        viewAllBookmarks: function () {
            this.$el.fadeOut(function () {
                this.$el.empty();
                this.count = 0;
                this.collection.forEach(this.addBookmark);
                this.$el.fadeIn();
            }.bind(this));
            
            return this;
        },
        
        
        goTo: function (num) {
            var yes = false, $this = this;
            
            $this.count = 0;
            $this.$el.empty();
            
            for (var i = 0; i < this.limit; i++) {
                (function (x) {
                    $this.addBookmark($this.collection.at(x));
                }(i));
            };
            
            return this; 
        },
        
        
        hasTag: function (tags, testTag) {
            var yes = false;  
              
            tags.forEach(function (tag) {
                if (trim(tag) === testTag) {
                    yes = true;   
                }
            });
            
            return yes; 
        },
        
        
        filterTags: function (tag) {
            var tagCollection;
            
            tagCollection = this.collection.origModels.filter(function (bookmark) {
                var tags = bookmark.get('tags');
                
                return this.hasTag(tags, tag);
            }.bind(this));
            
            this.$el.fadeOut(function () {
                this.$el.empty();
                tagCollection.forEach(this.addBookmark);
                this.$el.fadeIn();
            }.bind(this));
            
            return this;
        },

        /*
            @Details - Displays notifications to the user
            @Params -  String msg - text to be displayed
                       Number x - seconds before msg is cleared, default max
        */
        shout: function (msg, x) {
            if ($("#appMessage")) {
                $("#appMessage").fadeOut(function () {
                    $("#appMessage").remove();
                });
            }
            
            var elem = $('<div>', {'id': 'appMessage', html: msg});
            
            elem.click(function () {
                $(this).fadeOut(function () {
                    $(this).remove();
                });
            });
            
            if (x) {
                setTimeout(function () {
                    elem.click();
                }, x * 1000);
            }
            
            elem.hide().appendTo('body').slideDown();
        }        
    });
}(App.Views, App.Models, App.Collections, jQuery));
