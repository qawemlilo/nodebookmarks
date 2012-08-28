/*
    @Models - @User - holds user data and route url
*/
Backbone.Paginator = (function (Backbone, _, $) {

    "use strict";
    
    var Paginator = Backbone.Collection.extend({
    
        initialize: function () {
            this.sortColumn = "";
            this.filterFields = "";
        },
        
        
        nextPage: function () {
            if (this.currentPage + 1 <= this.totalPages) {
              this.currentPage += 1;
              this.pager();
            }
        },
        
        
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
        
        
        previousPage: function () {
            this.currentPage = --this.currentPage || 1;
            this.pager();
        },
        
        
        goTo: function ( page ) {
            if(page !== undefined){
                this.currentPage = parseInt(page, 10);
                this.pager();
	    }
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
    
    
	updateOrigModels: function ( cid ) {
	    var self = this;

        $.each(self.origModels, function (i, model) {
            if (model.cid === cid) {
                self.origModels.splice(i, 1);
                return false;
            }
        });
	},
	

    filterTags: function (tag) {
        var tagCollection;
            
        tagCollection = this.collection.origModels.filter(function (bookmark) {
            var tags = bookmark.get('tags');
                
            return this.hasTag(tags, tag);
        }.bind(this));
            
        this.$el.fadeOut(function () {
            this.$el.empty();
            tagCollection.forEach(this.addBookmark);
            this.$el.fadeIn();
        }.bind(this));
            
        return this;
    },
	
	
	info: function () {
	    var self = this,
	        info = {},
	        totalRecords = self.origModels ? self.origModels.length : self.length,
	        totalPages = Math.ceil(totalRecords / self.perPage),
	        totalGroups = Math.ceil(totalPages / 9),
	        currentGroup = self.currentGroup || 1;
	        
	        self.totalPages = totalPages;
	        self.totalGroups = totalGroups;
	        self.currentGroup = currentGroup;
	        
	    info = {
	        totalRecords: totalRecords,
	        currentPage: self.currentPage,
	        perPage: this.perPage,
	        totalPages: totalPages,
	        lastPage: totalPages,
	        previous: false,
	        next: false,
	        currentGroup: this.currentGroup || 1,
	        totalGroups: totalGroups,
	        counter: (this.currentGroup * 9) > totalPages ? totalPages : (this.currentGroup * 9)
	    };
	        
	        
	    if (self.currentPage > 1) {
	        info.previous = self.currentPage - 1;
	    }
	        
	    if (self.currentPage < info.totalPages) {
	        info.next = self.currentPage + 1;
	    }
	    
	    self.information = info;
	        
	    return info;
	}	
    });
    
    return Paginator;
}(Backbone, _, jQuery));
