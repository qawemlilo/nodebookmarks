/*
    @Module: Collections::Bookmarks 
*/

define(function() {
"use strict";
    var Bookmarks = Backbone.Pagination.extend({
    
        model: models.Bookmark,
        
        
        url: '/bookmarks',
        
        
        perPage: 10,
        
        
        groupLimit: 10,
        
        
        currentPage: 1
    });
    
    return Bookmarks;
});
