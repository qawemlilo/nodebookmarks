/*
    @Module - App.Models.Bookmark - holds bookmark data
    @Dependencies - Backbone
*/
(function(Backbone, models) {
    "use strict";
    
    models.Bookmark = Backbone.Model.extend({
        defaults: {
            publik: false,
            date: (new Date()).getTime(),
            url: '',
            title: '',
            notes: '',
            starred: false,
            tags: ['uncategorised']
        },
        
        createUrlRoot: function (url) {
            this.urlRoot = url;
            
            return this;
        }
    });
}(Backbone, App.Models));
