/*
    @Module: Collections::Bookmarks 
*/

define(['../models/bookmark', '../libs/pagination'], function(Bookmark) {
    "use strict";

    var Bookmarks = Backbone.Pagination.extend({
    
        model: Bookmark,
        
        
        url: '/bookmarks',
        
        
        perPage: 10,
        
        
        groupLimit: 10,
        
        
        currentPage: 1
    });
    
    return Bookmarks;
});
