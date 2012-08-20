/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections, $) {
"use strict";
    Views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        
        
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'filterTags', 'hasTag');
            
            $('.dropdown-toggle').dropdown();
            
            this.collection = new Collections.Bookmarks;
            
            this.collection.on('add', this.addBookmark);
            this.collection.on('reset', this.viewAllBookmarks);
            
            Collections.Bookmarks = this.collection;
        },
        

        addBookmark: function (bookmarkModel) {    
            var bookmarkView = new Views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.el);
        },
        

        viewAllBookmarks: function () {
            var $this = this;
            
            $this.$el.empty();
            this.collection.forEach(this.addBookmark);
            
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
            var tagCollection, $this = this;
            
            tagCollection = this.collection.filter(function (bookmark) {
                var tags = bookmark.get('tags');
                
                return $this.hasTag(tags, tag);
            });
            
            this.$el.empty();
            tagCollection.forEach(this.addBookmark);
            
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
