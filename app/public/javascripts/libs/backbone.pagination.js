/*
    @Models - @User - holds user data and route url
*/
Backbone.Paginator = (function (Backbone, _, $) {

    "use strict";
    
    var Paginator = Backbone.Collection.extend({
    
        initialize: function () {
            this.filteredModels = '';
            this.filteredTag = '';
            this.currentPage = 1;
            this.currentGroup = 1;
        },
        
        
        showPreNext: true,
        
        
        showFirstLast: true,
        
        
        groupLimit: 9, 
        
        
        nextGroup: function () {
            if (this.currentGroup + 1 <= this.totalGroups) {
              ++this.currentGroup;
              this.pager();
            }
        },
        
        
        previousGroup: function () {
            if (this.currentGroup - 1 > 0) {
              --this.currentGroup;
              this.pager();
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
	    
	        self.reset(self.models.slice(start, stop));
	    },
	
	
	    howManyPer: function ( perPage ) {
	        if (perPage !== undefined) {
	            var lastPerPage = this.perPage;
	            this.perPage = parseInt(perPage, 10);
	            this.currentPage = Math.ceil( ( lastPerPage * ( this.currentPage - 1 ) + 1 ) / perPage);
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
            
            tagCollection = self.origModels.filter(function (bookmark) {
                var tags = bookmark.get('tags');
                
                return self._hasTag(tags, tag);
            });
            
            self.currentPage = 1;
            self.currentGroup = 1;
            self.filteredTag = tag;
            self.filteredModels = tagCollection;
            
            self.pager();
        },
        
        
        _hasTag: function (tags, testTag) {
            var yes = false;  
              
            tags.forEach(function (tag) {
                if (tag === testTag) {
                    yes = true;   
                }
            });
            
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
            var alltags = this._buildTags(), uniqueTags = [], tempTags = {};
            
            alltags.forEach(function (tag) {
                if (!tempTags.hasOwnProperty(tag)) {
                    tempTags[tag] = true;
                    uniqueTags.push(tag);
                }
            });
            
            uniqueTags.sort();
            
            return uniqueTags;
        },
        
        
        _buildTags: function () {
            var tags = [];
            
            this.origModels.forEach(function (bookmark) {
                var subtags = bookmark.get('tags');
                
                subtags.forEach(function (tag){
                    tag = trim(tag);
                    tags.push(tag);
                }); 
            });
            
            return tags;
        },        
    });
    
    return Paginator;
}(Backbone, _, jQuery));
