/*
    @Models - @User - holds user data and route url
*/
Backbone.Pagination = (function (Backbone, _, $) {

    "use strict";
    
    var Pagination = Backbone.Collection.extend({
    
        initialize: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
        },
        
        
        showPreNext: true,
        
        
        showFirstLast: true,
        
        
        sortOrder: 'desc',
        
        
        groupLimit: 9, 
        

        changeSortOder: function (direction) {
            if (direction) {
                this.sortOrder = direction;
            }
            
            this.pager();
        },

        
        nextGroup: function () {
            if (this.currentGroup + 1 <= this.totalGroups) {
              ++this.currentGroup;
            }
        },
        
        
        previousGroup: function () {
            if (this.currentGroup - 1 > 0) {
              --this.currentGroup;
            }
        }, 
        
        
        goTo: function ( page ) {
            if (page !== undefined) {
                this.currentPage = parseInt(page, 10);
                this.currentGroup = Math.ceil(page / this.groupLimit);
                this.pager();
	        }
	    },
        
        
        resetFilteredModels: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
            this.pager();
	    },
	
	
        pager: function () {
            var self = this,
                disp = this.perPage,
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
	
	
	    howManyPer: function ( perPage ) {
	        if (perPage !== undefined) {
	            var lastPerPage = this.perPage;
	            this.perPage = parseInt(perPage, 10);
	            this.currentPage = Math.ceil( ( lastPerPage * ( this.currentPage - 1 ) + 1 ) / perPage);
                this.currentGroup = Math.ceil(this.currentPage / this.groupLimit);
	            this.pager();
	        }
	    },
    
    
	    removeFromOGModels: function ( cid ) {
	        var self = this;

            $.each(self.origModels, function (i, model) {
                if (model.cid === cid) {
                    self.origModels.splice(i, 1);
                    return false;
                }
            });
	    },
	

        filterTags: function (tag) {
            var tagCollection, self = this;
            
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
        
        
        hasTag: function (tags, testTag) {
            var yes = false;  
              
            _.each(tags, function (tag) {
                if (tag === testTag) {
                    yes = true;   
                }
            }, this);
            
            return yes; 
        },
	
	
	    info: function () {
	        var self = this,
	        info = {},
	        totalRecords = this.filteredModels ? this.filteredModels.length : (self.origModels !== undefined) ? self.origModels.length : self.length,
	        totalPages = Math.ceil(totalRecords / self.perPage),
	        totalGroups = Math.ceil(totalPages / this.groupLimit),
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
	            perPage: this.perPage,
	            totalPages: totalPages,
	            lastPage: totalPages,
	            previous: false,
	            next: false,
	            currentGroup: this.currentGroup || 1,
	            totalGroups: totalGroups,
	            counterLimit: (this.currentGroup * groupLimit) > totalPages ? totalPages : (this.currentGroup * groupLimit),
                counter: (this.currentGroup * groupLimit) - (groupLimit - 1),
                groupLimit: groupLimit,
                filteredTag: this.filteredTag
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
        

        getTags: function (arr) {
            var alltags = this.buildTags(), uniqueTags = [], tempTags = {};
            
            _.each(alltags, function (tag) {
                if (!tempTags.hasOwnProperty(tag)) {
                    tempTags[tag] = true;
                    uniqueTags.push(tag);
                }
            }, this);
            
            uniqueTags.sort();
            
            return uniqueTags;
        },
        
        
        buildTags: function () {
            var tags = [], models = this.origModels || this.models;
            
            _.each(models, function (bookmark) {
                var subtags = bookmark.get('tags');
                
                _.each(subtags, function (tag) {
                    tag = trim(tag);
                    tags.push(tag);
                }, this); 
            }, this);
            
            return tags;
        },
        

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
