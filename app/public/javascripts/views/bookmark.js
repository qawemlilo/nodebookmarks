/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models) {
"use strict";
    Views.Bookmark = Backbone.View.extend({
    
        tagName: 'tr',
        
        
        className: 'bookmark',
        
        
        events: {
            'click': 'showDatails',
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render', 'showDatails');          
        },

        render: function () {
            var div = $('<div>'), 
                a = $('<a>', {
                    'class': 'bookmark-link',
                    'href': this.model.url,
                    'html': this.model.title,
                    'target': '_blank'
                }),
                
                p = $('<p>', {
                    'html': this.model.notes,
                    'class': 'bookmark-note'
                }),
                
                tags = $('<div>', {
                    'class': 'tags'
                });
                
            div.append(a);
            div.append(p);            
            
            $(this.model.tags).each(function(i, tag){
                $('<span>', {
                    'class': 'tag',
                    'html': tag 
                });
                
                tags.append(tag);
            });
            
            div.append(tags);
            $(this.el).append(div);
            
            return this;
        },
        
        showDatails: function () {
           alert(this.model.cid);
        }            
    });
}(App.Views, App.Models));