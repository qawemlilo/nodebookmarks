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
            
            this.render();
        },
        

        render: function () {
            var div = $('<div>'), 
                a = $('<a>', {
                    'class': 'bookmark-link',
                    'href': this.model.get('url'),
                    'html': this.model.get('title'),
                    'target': '_blank'
                }),
                
                p = $('<p>', {
                    'html': this.model.get('notes'),
                    'class': 'bookmark-note'
                }),
                
                tags = $('<div>', {
                    'class': 'tags'
                });
                
            $(div).append(a);
            $(div).append(p);            
            
            (this.model.get('tags')).forEach(function(tag) {
                var span = $('<span>', {
                    'class': 'tag',
                    'html': tag 
                });
                
                $(tags).append(span);
            });
            
            $(div).append(tags);
            $(this.el).append(div);
            
            return this;
        },
        
        
        showDatails: function () {
           alert(this.model.cid);
        }            
    });
}(App.Views, App.Models));