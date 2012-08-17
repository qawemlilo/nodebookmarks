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
            _.bindAll(this, 'addBookmark', 'addBookmarks');
            
            this.collection = new Collections.Bookmarks();
            
            this.collection.bind('add', this.addBookmark);
            this.collection.bind('reset', this.addBookmarks);
            
            Collections.Bookmarks = this.collection;
        },
        

        addBookmark: function (bookmarkModel) {    
            var bookmarkView = new Views.Bookmark({
                model: bookmarkModel
            });
            
            $(this.el).append(bookmarkView.el);
        }, 

        addBookmarks: function (bookmarkModel) {    
            this.collection.forEach(this.addBookmark);
            console.log(this.collection.models);
        }         
    });
}(App.Views, App.Models, App.Collections, jQuery));