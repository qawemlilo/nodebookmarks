/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, collections, $) {
    "use strict";
    
    views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        
        
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'bookmarksHeader', 'render');
            
            $('.dropdown-toggle').dropdown();
            
            this.collection.on('add', this.addBookmark);
            this.collection.on('reset', this.viewAllBookmarks);
        },
        
        
        render: function () {
            return this;
        },
        

        addBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.el);
        },
        

        bookmarksHeader: function () { 
            var header = $('<thead>'), tr = $('<tr>'), data = this.collection.info(), html = '', td;
            
            
            if (this.collection.filteredTag) {
                html += '<i class="icon-tags"></i> <span class="label label-important">' + this.collection.filteredTag.toUpperCase() + '</span> &nbsp; ';
            }
            
            html += 'Page ' + data.currentPage + ' of ' + data.totalPages; 
            
            td = $('<th>', {
                colspan: 2,
                html: html
            });
            
            tr.append(td);
            header.append(tr);
            
            this.$el.append(header);
        },
        

        viewAllBookmarks: function () {
            this.$el.fadeOut(function () {
                this.$el.empty();
                this.bookmarksHeader();
                this.collection.forEach(this.addBookmark);
                this.$el.fadeIn();
            }.bind(this));
            
            return this;
        }        
    });
}(App.Views, App.Collections, jQuery));
