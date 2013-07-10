
define(['../views/bookmark', '../models/bookmark', '../libs/bootstrap-dropdown'], function (Bookmark, Model) {
    "use strict";
    
    var Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        

     
        initialize: function (opts) {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'bookmarksHeader', 'render');
            
            $('.dropdown-toggle').dropdown();
            
            this.app = opts.app;
            
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
            var self = this;

            var bookmarkView = new Bookmark({
                model: bookmarkModel,
                app: self.app
            });

            self.$el.append(bookmarkView.render());
        },
        
        
        

        /*
            Loads a new bookmark form
            @Param: (Object) bookmarkModel - bookmark model
        */          
        newBookmark: function (bookmarkModel) { 
            var bookmarkView, self = this;
            
            bookmarkView = new Bookmark({
                model: bookmarkModel,
                app: self.app
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
            var header = document.createElement('thead'), 
                tr = document.createElement('tr'), 
                data = this.collection.info(), 
                html = '', 
                th = document.createElement('th');
            
            
            if (this.collection.filteredTag) {
                html += '<i class="icon-tags"></i> <span class="label label-important">' + this.collection.filteredTag.toUpperCase() + '</span> &nbsp; ';
            }
            
            html += 'Page ' + data.currentPage + ' of ' + data.totalPages; 
            
            if (this.collection.filteredTag) {
                html += '<a href="#bookmarks" class="close">&times;</a>';
            }
            
            th.innerHTML = html;
            th.setAttribute("colspan", "2");
            
            tr.appendChild(th);
            header.appendChild(tr);
            
            return header;
        },
        
        


        /*
            Loops through a collection and appends all bookmarks to the bookmarks table
        */ 
        viewAllBookmarks: function () {
            var self = this, fragment = document.createDocumentFragment();
            
 
            fragment.appendChild(self.bookmarksHeader());
            
            self.collection.forEach(function (bookmarkModel) { 
                var bookmarkView = new Bookmark({
                    model: bookmarkModel,
                    app: self.app
                });

                fragment.appendChild(bookmarkView.render());
            });
            
            this.$el.html(fragment);
        }        
    });
    
    return Bookmarks;
});
