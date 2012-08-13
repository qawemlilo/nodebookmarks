/*
    @Models - @Bookmark - holds bookmark data
*/
(function(Models) {
"use strict";
    Models.Bookmark = Backbone.Model.extend({
        defaults: {
            date: '',
            url: '',
            title: '',
            notes: '',
            tags: []
        }
    });
}(App.Models));