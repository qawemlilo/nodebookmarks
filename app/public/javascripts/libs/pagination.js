/*
    @Plugin: Backbone.Pagination - pagination plugin
    @Dependencies - jQuery
                  - Backbone 
                  - UnderScore 
    
    * Note: This plugin is a custom implemenation of Backbone.Paginator By Addy Osmani <http://addyosmani.com>
*/
Backbone.Pagination = (function (Backbone, _, $) {
    "use strict";
    
    var Pagination = Backbone.Collection.extend({
    
        initialize: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
            this.allFetched = false;
        },
        
        
        showPreNext: true,
        
        
        showFirstLast: true,
        
        
        sortOrder: 'desc',
        
        
        groupLimit: 9, 
        

        /*
            @Public
            @Void: sets the sortOrder of collection 
        */
        changeSortOder: function (direction) {
            if (direction) {
                this.sortOrder = direction;
            }
            
            this.pager();
        },
        

        /*
            @Public
            @Void: sets the number for the next group of pages 
        */   
        nextGroup: function () {
            if (this.currentGroup + 1 <= this.totalGroups) {
              ++this.currentGroup;
            }
        },
        


        /*
            @Public
            @Void: sets the number for the previous group of pages
        */        
        previousGroup: function () {
            if (this.currentGroup - 1 > 0) {
              --this.currentGroup;
            }
        }, 
        


        /*
            @Public
            @Void: sets the page number to go to
            @Param: (Number) page - page number            
        */        
        goTo: function ( page ) {
            if (page !== undefined) {
                this.currentPage = parseInt(page, 10);
                this.currentGroup = Math.ceil(page / this.groupLimit);
                this.pager();
	        }
	    },
        
        
        /*
            @Public
            @Void: resets collection 
        */        
        refresh: function () {
            this.goTo(this.currentPage);
	    },
        
        


        /*
            @Public
            @Void: resets collection 
        */        
        resetFilteredModels: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
            this.pager();
	    },
	


        /*
            @Public
            @Void: checks properties and resets the collection by loading a portion models for public access
        */	
        pager: function () {
            var self = this,
                disp = self.perPage,
                start = (self.currentPage - 1) * disp,
                stop = start + disp;
            
            if (self.origModels === undefined) {
                self.origModels = self.models;
	        }
	    
	        self.models = self.origModels;
	        
            if (self.filteredModels) {
                self.models = self.filteredModels;
	        }
            
            self.models = self.sortModels(self.models, self.sortOrder);
	    
	        self.reset(self.models.slice(start, stop));
	    },
	

        /*
            @Public
            @Void: sets number of bookmarks per page and performs a calculation to determine currentPage and currentGroup 
            @Param: (Number) perPage - number of bookmarks per page
        */		
	    setLimit: function ( perPage ) {
	        if (perPage !== undefined) {
	            var lastPerPage = this.perPage;
	            this.perPage = parseInt(perPage, 10);
	            this.currentPage = Math.ceil( ( lastPerPage * ( this.currentPage - 1 ) + 1 ) / perPage);
                this.currentGroup = Math.ceil(this.currentPage / this.groupLimit);
	            this.pager();
	        }
	    },
    


        /*
            @Public
            @Void: updates original models upon bookmark deletion
            @Param: (Mixed) cid - model unique id
        */	    
	    removeFromOGModels: function ( cid ) {
	        var self = this;
            
            
            $.each(self.origModels, function (i, model) {
                if (model.cid === cid) {
                    self.origModels.splice(i, 1);
                    return false;
                }
            });
            
            // if we have filtered models we need to update them as well
            if (self.filteredModels) {
                $.each(self.filteredModels, function (i, model) {
                    if (model.cid === cid) {
                        self.filteredModels.splice(i, 1);
                        return false;
                    }
                 });            
            }
	    },
	

    
        /*
            @Public
            @Void: filters models containing tag
            @Param: (String) tag - tag being filtered
        */	    
        filterTags: function (tag) {
            var tagCollection, self = this;
            
            tag = decodeURIComponent(tag);
            
            tagCollection = _.filter(self.origModels, function (bookmark) {
                var tags = bookmark.get('tags');
                
                return self.hasTag(tags, tag);
            });
            
            self.currentPage = 1;
            self.currentGroup = 1;
            self.filteredTag = tag;
            self.filteredModels = tagCollection;
            
            self.pager();
        },
	


        /*
            @Public
            @Object: calculates, updates and returns current properties
        */	
	    info: function () {
	        var self = this,
	        info = {},
	        totalRecords = self.filteredModels ? self.filteredModels.length : (self.origModels !== undefined) ? self.origModels.length : self.length,
	        totalPages = Math.ceil(totalRecords / self.perPage),
	        totalGroups = Math.ceil(totalPages / self.groupLimit),
	        currentGroup = self.currentGroup || 1,
            groupLimit = self.groupLimit;
	        
	        self.totalPages = totalPages;
	        self.totalGroups = totalGroups;
	        self.currentGroup = currentGroup;
	        
	        info = {
                showFirstLast: self.showFirstLast,
                showPreNext: self.showPreNext,
	            totalRecords: totalRecords,
	            currentPage: self.currentPage,
	            perPage: self.perPage,
	            totalPages: totalPages,
	            lastPage: totalPages,
	            previous: false,
	            next: false,
	            currentGroup: self.currentGroup || 1,
	            totalGroups: totalGroups,
	            counterLimit: (self.currentGroup * groupLimit) > totalPages ? totalPages : (self.currentGroup * groupLimit),
                counter: (self.currentGroup * groupLimit) - (groupLimit - 1),
                groupLimit: groupLimit,
                filteredTag: self.filteredTag,
                allFetched: self.allFetched
	        };
	        
	        
	        if (self.currentGroup > 1) {
	            info.previous = true;
	        }
	        
	        if (self.currentGroup < info.totalGroups) {
	            info.next = true;
	        }
	    
	        self.information = info;
	        
	        return info;
	    },
        

        /*
            @Private
            @Boolean: checks if array contains tag
            @Params: (Array) tags - haystack
                     (String) tag - needle
        */	        
        hasTag: function (tags, tag) {
            var yes = false, i;  
             
            for (i = 0; i < tags.length; i++) {
                if (tags[i] === tag) {
                    yes = true;
                    break;
                }
            }             
            
            return yes; 
        },
        


        /*
            @Public
            @Boolean: checks if array contains tag
        */        
        getTags: function () {
            var tags = this.buildTags(), 
                uniqueTags = _.uniq(tags);
            
            uniqueTags.sort();
            
            return uniqueTags;
        },
        


        /*
            @Private
            @Array: combines all collection tags into one array
        */          
        buildTags: function () {
            var tags = [], models = this.origModels || this.models;
            
            _.each(models, function (bookmark) {
                var subtags = bookmark.get('tags');
                tags.push(subtags);
            }, this);
            
            return _.flatten(tags);
        },
        


        /*
            @Private
            @Array: sorts the order of models, descending or ascending
            @Params: (Array) models - models to be sortedmodels
                     (String) direction - 'desc' or 'asc'
        */          
        sortModels: function (models, direction) {
            
            var sortedmodels, 
            
            sortFn = function (a, b) {
                if (direction === 'desc') {
                    return b.get('date') - a.get('date');
                }
                    
                return a.get('date') - b.get('date');
            };
            
            sortedmodels = models.sort(sortFn);
            
            return sortedmodels;
        }
        
    });
    
    return Pagination;
}(Backbone, _, jQuery));
