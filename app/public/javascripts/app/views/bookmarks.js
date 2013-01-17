
define(['../views/bookmark', '../libs/bootstrap-transition', '../libs/bootstrap-collapse', '../libs/bootstrap-dropdown'], function (Bookmark) {
    "use strict";
    
    var Bookmarks = Backbone.View.extend({
    
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
            var bookmarkView = new Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.render().el);
        },
        
        
        

        /*
            Loads a new bookmark form
            @Param: (Object) bookmarkModel - bookmark model
        */          
        newBookmark: function (bookmarkModel) { 
            var bookmarkView = new Bookmark({
                model: bookmarkModel
            }), 
            
            self = this;
            
            self.$el.fadeOut(function () {
                self.$el.html(bookmarkView.newBookmark().el).fadeIn();
            });
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
            var self = this;
            
            self.$el.fadeOut(function () {
                self.$el.empty();
                self.bookmarksHeader();
                self.collection.forEach(self.addBookmark);
                self.$el.fadeIn();
            });
        }        
    });
    
    return Bookmarks;
});
