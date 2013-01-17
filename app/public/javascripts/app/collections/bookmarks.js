/*
    @Module: Collections::Bookmarks 
*/

define(['../models/bookmark', '../libs/pagination'], function(Bookmark, Pagination) {
    "use strict";

    var Bookmarks = Pagination.extend({
    
        model: new Bookmark(),
        
        
        url: '/bookmarks',
        
        
        perPage: 10,
        
        
        groupLimit: 10,
        
        
        currentPage: 1
    });
    
    return Bookmarks;
});
