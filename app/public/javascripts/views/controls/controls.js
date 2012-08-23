/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Collections, $) {
"use strict";
    Views.Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        controlsTemplate: new EJS({url: '/javascripts/views/controls/tmpl/controls.ejs'}),
        
        
        events: {
            'click .btn-group .new-bookmark': 'newBookmark'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render', 'getAllTags', 'getDistinctTags');
        },
        

        render: function () {
            var bookmarks = Collections.Bookmarks, controlsTemplate, tags = this.getDistinctTags();

            controlsTemplate = this.controlsTemplate.render({tags: tags});
                
            this.$el.append(controlsTemplate);
            
            return this;
        },
        
        
        getDistinctTags: function (arr) {
            var alltags = this.getAllTags(), uniqueTags = [], tempTags = {};
            
            alltags.forEach(function (tag) {
                if (!tempTags.hasOwnProperty(tag)) {
                    tempTags[tag] = true;
                    uniqueTags.push(tag);
                }
            });
            
            uniqueTags
            
            return uniqueTags;
        },
        
        
        getAllTags: function () {
            var tags = [];
            
            Collections.Bookmarks.forEach(function (bookmark) {
                var subtags = bookmark.get('tags');
                
                subtags.forEach(function (tag){
                    tag = trim(tag);
                    tags.push(tag);
                }); 
            });
            
            return tags;
        },
        
        newBookmark: function (e) {
            e.preventDefault();
            
            var model = new Models.Bookmark();
            
            model.setUrl('/bookmarks/add');
            
            Views.Bookmarks.newBookmark(model);
        }
    });
}(App.Views, App.Models, App.Collections, jQuery));
