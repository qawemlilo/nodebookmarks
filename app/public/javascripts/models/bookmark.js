/*
    @Models - @Bookmark - holds bookmark data
*/
(function(Models) {
"use strict";
    Models.Bookmark = Backbone.Model.extend({
        defaults: {
            id: '',
            publik: '',
            date: '',
            url: '',
            title: '',
            notes: '',
            starred: false,
            tags: []
        }
    });
}(App.Models));
