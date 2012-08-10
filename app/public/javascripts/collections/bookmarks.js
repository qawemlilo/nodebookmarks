/*
    @Models - @User - holds user data and route url
*/
(function(Models, Collections) {
"use strict";
    Collections.Bookmarks = Backbone.Model.extend({
        model: Models.Bookmark,
        
        url: '/bookmarks'
    });
}(App.Models, App.Collections));