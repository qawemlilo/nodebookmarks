/*
    @Module - App.Models.Bookmark - holds bookmark data
    @Dependencies - Backbone
*/
(function(Backbone, models) {
    "use strict";
    
    models.Bookmark = Backbone.Model.extend({
        defaults: {
            id: '',
            publik: false,
            date: (new Date()).getTime(),
            url: '#',
            title: 'title',
            notes: 'notes',
            starred: false,
            tags: ['uncategorised']
        }
    });
}(Backbone, App.Models));
