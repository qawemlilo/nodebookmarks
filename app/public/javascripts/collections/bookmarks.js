/*
    @Models - @User - holds user data and route url
*/
(function(Models, Collections) {
"use strict";
    Collections.Bookmarks = Backbone.Collection.extend({
        model: Models.Bookmark,
        
        url: '/bookmarks',
        
        parse: function(response) {
            console.log(response.results);
        }
    });
}(App.Models, App.Collections));