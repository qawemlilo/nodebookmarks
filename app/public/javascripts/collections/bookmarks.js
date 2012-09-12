/*
    @Module: Collections::Bookmarks 
*/
(function(models, collections) {
"use strict";
    collections.Bookmarks = Backbone.Pagination.extend({
    
        model: models.Bookmark,
        
        
        url: '/bookmarks',
        
        
        perPage: 8,
        
        
        groupLimit: 9,
        
        
        currentPage: 1
    });
}(App.Models, App.Collections));
