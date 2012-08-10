/*
    @Models - @Bookmark - holds bookmark data
*/
(function(Models) {
"use strict";
    Models.Bookmark = Backbone.Model.extend({
        defaults: {
            url: '',
            title: '',
            notes: '',
            tags: []
        }
    });
}(App.Models));