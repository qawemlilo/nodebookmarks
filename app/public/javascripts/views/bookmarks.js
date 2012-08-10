/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections) {
"use strict";
    Views.Bookmarks = Backbone.View.extend({
    
        el: $('#home'),
        
        
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'addBookmarks');
            
            this.collection = Collections.Bookmarks = new Collections.Bookmarks();
            
            this.collection.bind('add', this.addBookmark);
            this.collection.bind('reset', this.addBookmarks);
            
            this.collection.fetch();
        },
        

        addBookmark: function (bookmarkModel) {    
            var bookmarkView = new Views.Bookmark({
                model: bookmarkModel
            });
            
            console.log(bookmarkModel.get('title'));
            
            $(this.el).append(bookmarkView.render().el);
        }, 

        addBookmarks: function (bookmarkModel) {    
            this.collection.each(this.addBookmark);
        }         
    });
}(App.Views, App.Models, App.Collections));