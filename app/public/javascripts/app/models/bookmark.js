/*

*/
define(['../libs/backbone'], function(Backbone) {
    "use strict";
    
    var Bookmark = Backbone.Model.extend({
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
    
    return Bookmark;
});
