/*
    The bookmarks view is the table containing currently selected bookmarks
    It appends the bookmark view
*/
(function (Backbone, views, $) {
    "use strict";
    
    views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        

     
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'bookmarksHeader', 'render');
            
            $('.dropdown-toggle').dropdown();
            
            this.collection.on('add', this.addBookmark);
            this.collection.on('reset', this.viewAllBookmarks);
            
            return this;
        },
        
        
        
        
        render: function () {
            return this;
        },
        
        


        /*
            Appends a bookmark view the bookmarks table
            @Param: (Object) bookmarkModel - bookmark model
        */        
        addBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.render().el);
        },
        
        
        

        /*
            Loads a new bookmark form
            @Param: (Object) bookmarkModel - bookmark model
        */          
        newBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.fadeOut(function () {
                this.$el.html(bookmarkView.newBookmark().el).fadeIn();
            }.bind(this));
        },
        
        
        


        /*
            Appends a header to the bookmarks table
        */ 
        bookmarksHeader: function () { 
            var header = $('<thead>'), tr = $('<tr>'), data = this.collection.info(), html = '', th;
            
            
            if (this.collection.filteredTag) {
                html += '<i class="icon-tags"></i> <span class="label label-important">' + this.collection.filteredTag.toUpperCase() + '</span> &nbsp; ';
            }
            
            html += 'Page ' + data.currentPage + ' of ' + data.totalPages; 
            
            if (this.collection.filteredTag) {
                html += '<a href="#bookmarks" class="close">&times;</a>';
            }
            
            th = $('<th>', {
                colspan: 2,
                html: html
            });
            
            tr.append(th);
            header.append(tr);
            
            this.$el.append(header);
        },
        
        


        /*
            Loops through a collection and appends all bookmarks to the bookmarks table
        */ 
        viewAllBookmarks: function () {          
            this.$el.fadeOut(function () {
                this.$el.empty();
                this.bookmarksHeader();
                this.collection.forEach(this.addBookmark);
                this.$el.fadeIn();
            }.bind(this));
        }        
    });
}(Backbone, App.Views, jQuery));
