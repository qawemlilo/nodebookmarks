/*
    @Models - @Bookmark - holds bookmark data
*/
(function(Models) {
"use strict";
    Models.Bookmark = Backbone.Model.extend({
        defaults: {
            id: '',
            publik: false,
            date: new Date().getTime(),
            url: '#',
            title: 'title',
            notes: 'notes',
            starred: false,
            tags: ['uncategorised']
        },
        
        setUrl: function  (url) {
            this.url = url;
        }
    });
}(App.Models));
