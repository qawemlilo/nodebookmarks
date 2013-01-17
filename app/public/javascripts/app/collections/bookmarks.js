/*
    @Module: Collections::Bookmarks 
*/

define(['../models/bookmark'], function(Bookmark) {
    "use strict";

    var Bookmarks = Backbone.Collection.extend({
    
        model: new Bookmark,
        
        
        url: '/bookmarks',
        
        
        perPage: 10,
        
        
        groupLimit: 10,
        
        
        currentPage: 1
    });
    
    return Bookmarks;
});
