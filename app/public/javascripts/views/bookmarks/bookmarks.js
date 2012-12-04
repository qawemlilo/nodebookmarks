/*
    @Module: App.Views.Bookmarks - renders bookmarks collection
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore
*/
(function (Backbone, views, $) {
    "use strict";
    
    views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        


        /*
            @Public
            @Constructor: (Void - chainable) binds collection events
        */        
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
            @Public
            @Void: appends a bookmark view the bookmarks table
            @Param: (Object) bookmarkModel - bookmark model
        */        
        addBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.render().el);
        },
        

        
        newBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.html(bookmarkView.newBookmark().el);
        },
        


        /*
            @Public
            @Void: appends a header to the bookmarks table 
            @Param: (Object) bookmarkModel - bookmark model
        */ 
        bookmarksHeader: function () { 
            var header = $('<thead>'), tr = $('<tr>'), data = this.collection.info(), html = '', td;
            
            
            if (this.collection.filteredTag) {
                html += '<i class="icon-tags"></i> <span class="label label-important">' + this.collection.filteredTag.toUpperCase() + '</span> &nbsp; ';
            }
            
            html += 'Page ' + data.currentPage + ' of ' + data.totalPages; 
            
            if (this.collection.filteredTag) {
                html += '<a href="#bookmarks" class="close">&times;</a>';
            }
            
            td = $('<th>', {
                colspan: 2,
                html: html
            });
            
            tr.append(td);
            header.append(tr);
            
            this.$el.append(header);
        },
        


        /*
            @Public
            @Void: appends all bookmarks to the bookmarks table
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
