/*
    @Module - App.Models.Bookmark - holds bookmark data
    @Dependencies - Backbone
*/
(function(Backbone, models) {
    "use strict";
    
    models.Bookmark = Backbone.Model.extend({
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
}(Backbone, App.Models));
/*
    @Module: Collections::Bookmarks 
*/
(function(models, collections) {
"use strict";
    collections.Bookmarks = Backbone.Pagination.extend({
    
        model: models.Bookmark,
        
        
        url: '/bookmarks',
        
        
        perPage: 10,
        
        
        groupLimit: 10,
        
        
        currentPage: 1
    });
}(App.Models, App.Collections));
/*
    @Module: App.Views.Profile - renders profile page
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore                  
                  - EJS 
*/
(function(Backbone, views, models, Template, $) {
    "use strict";
    
    views.Profile = Backbone.View.extend({
    
        el: $('#profile'),
        
        
        settingsTemplate: new Template({url: '/javascripts/views/forms/tmpl/profile.ejs'}),
        
        
        events: {
            'submit #settings-form': 'updateUser',
            'submit #delete': 'promptUser'
        },
        
      
        initialize: function () {
            _.bindAll(this, 'render', 'getUserData', 'updateUser', 'updateForm', 'promptUser');
            
            if (App.page === 'demo') {
                return;
            }
            
            this.model = new models.User();
            this.model.task = 'update';
            this.model.on('change', this.updateForm);
 
            models.User = this.model;
            
            return this;
        },
        

        /*
            @Api:     public - loads template and renders profile form 
            @Returns: void
        */
        render: function () {
            if (App.page === 'demo') {
                return;
            }
            
            this.getUserData(function (data) { 
                var settingsTemplate = this.settingsTemplate.render(data);
                
                this.$el.append(settingsTemplate);
            }.bind(this));
            
            return this;
        },


        /*
            @Api:     private - updates profile form
            @Returns: void
        */
        updateForm: function () {
            $('#email').attr('value', this.model.get('email'));
            $('#name').attr('value', this.model.get('name'));
        },
        
        
        promptUser: function (e) {
            return confirm('Are you sure you want to delete your account?');
        },
        


        /*
            @Api:     private - updates user model and posts to the server
            @Returns: void
            @Param:   (Object) e - submit event object           
        */        
        updateUser: function (e) {    
            e.preventDefault();
            
            var data = this.formToObject('settings-form'), successHandler, errorHandler; 
            
            successHandler = function (model, res) {
                if ($('#email').hasClass('warning')) {
                    $('#email').removeClass('warning');
                }
                if ($('#name').hasClass('warning')) {
                    $('#name').removeClass('warning');
                }
                
                $.shout(res.msg, 10, 'success');
            };
            
            errorHandler = function (model, res) {
                $.shout(res.msg || res, 10, 'error');
            };
            
            this.model.save(data, {success: successHandler, error: errorHandler, wait: true});
        },
        


        /*
            @Api:     private - fetches user data from the server
            @Returns: void
            @Param:   (Function) next - function called after fetch request is complete
        */        
        getUserData: function (next) {
            this.model.fetch({
                success: function (model, res) {
                    next(res);
                },
                
                error: function (model, res){
                    next({name: '', email: '', password: ''});
                }
            });
        },
        
        


        /*
            @Api:     private - serializes form to hash
            @Returns: void
            @Param:   (String) id - form html id attribute
        */         
        formToObject: function (id) {
            var i, formObj = {}, arr = $('#' + id).serializeArray();

            for (i = 0; i < arr.length; i++) {
                if (arr[i].name !== 'submit') {
                    formObj[arr[i].name] = arr[i].value;
                }
            }
            
            return formObj;
        }           
    });
}(Backbone, App.Views, App.Models, EJS, jQuery));
/*
    @Module: App.Views.Bookmark - renders a bookmark
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore
*/
(function (Backbone, views, collections, Template, $) {
    "use strict";
    
    views.Bookmark = Backbone.View.extend({
    
        tagName: 'tr',
        
        
        className: 'bookmark',
        
        
        events: {
            'dblclick': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-edit-link': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-delete': 'deleteBookmark',
            
            'click .cancel': 'cancelEdit',
            
            'submit .bookmark-edit-form': 'saveEdit',
            
            'click #new-bookmark-form .cancel': 'cancelNew',
            
            'submit #new-bookmark-form': 'saveNew'
        },
        
        
        activeEditor: false,
        
        
        activeNew: false,
        
        
        editTemplate: new Template({url: '/javascripts/views/bookmark/tmpl/edit.ejs'}),
        
        
        bookmarkTemplate: new Template({url: '/javascripts/views/bookmark/tmpl/bookmark.ejs'}),
        
        
        newBookmarkTemplate: new Template({url: '/javascripts/views/bookmark/tmpl/new.ejs'}),
        


        /*
            @Api: public - binds change model events and initializes bookmark 
        */        
        initialize: function () {
            var $this = this;
            
            _.bindAll(this, 'render', 'unrender', 'saveEdit', 'cancelNew', 'newBookmark', 'saveNew', 'cancelEdit', 'update', 'loadEditor', 'deleteBookmark', 'getCleanModel');

            
            this.model.on('change', function () {
                var attrs = ['publik', 'url', 'title', 'notes', 'starred', 'tags'], i;
                
                for (i = 0; i < attrs.length; i++) {
                    if (this.model.hasChanged(attrs[i])) {
                        this.update(attrs[i]);
                    }
                }
            }.bind(this));        
            
            return this;
        },
        


        /*
            @Public
            @Void: loads template and renders bookmark
        */        
        render: function () {
            var model = this.getCleanModel(), bookmarkTemplate;
            
            bookmarkTemplate = this.bookmarkTemplate.render(model);   
            this.$el.append(bookmarkTemplate);
            
            return this;
        },
        


        /*
            @Private
            @Void: unrenders bookmark
        */         
        unrender: function () {
            this.$el.addClass('highlight')
            
            .fadeOut(function () {
                this.$el.remove();
            }.bind(this));
        },
        
        
        
        
        newBookmark: function () {
            var date = this.formatDate(), newbookmarkTemplate = this.newBookmarkTemplate.render(date);
             
            this.activeNew = true;
            this.$el.append(newbookmarkTemplate);
            
            return this;
        },
        
        


        /*
            @Private
            @Void: handles the submitted bookmark form data
            @Param: (Object) e - submit event object
        */         
        saveEdit: function (e) {
            e.preventDefault();
            
            var cleantags = [], 
                formObj = {}, 
                successHandler, 
                errorHandler, 
                editForm = this.$('.bookmark-edit-form'),
                editFormDiv = this.$('.bookmark-edit'),
                formValues = editForm.serializeArray(),
                errmsg = (App.page === 'demo') ? 'Error, unauthorised user' : 'Error occured, bookmark not updated';
            
            _.each(formValues, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });

            formObj.tags = formObj.tags.split(',') || [formObj.tags];
            formObj.publik = !(!!formObj.publik);
            
            _.each(formObj.tags, function (rawTag) {
                cleantags.push(rawTag.trim());
            });
             
            formObj.tags = cleantags;

            successHandler = function (model, response) {
                this.activeEditor = false; // unlock editor
                $.shout(response.msg, 10, 'success');
                
                views.Controls.render(); // refresh tags
            }.bind(this);
            
            errorHandler = function (model, response) {
                this.activeEditor = false; // unlock editor
                
                $.shout(errmsg, 10);
            }.bind(this);
            
            editFormDiv.fadeOut(function () {
                editFormDiv.empty().hide();
                this.$('.bookmark-main').fadeIn();
            }.bind(this));
            
            this.model.save(formObj, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        /*
            @Private
            @Void: handles the submitted bookmark form data
            @Param: (Object) e - submit event object
        */         
        saveNew: function (e) {
            e.preventDefault();
            
            var formObj = {}, 
                successHandler, 
                errorHandler, 
                editForm = this.$('#new-bookmark-form'),
                formValues = editForm.serializeArray(),
                self = this,
                cleantags = [],
                errmsg = (App.page === 'demo') ? 'Error, unauthorised user' : 'Error occured, bookmark not saved';

            _.each(formValues, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });

            formObj.tags = formObj.tags.replace(' ', '');
            formObj.tags = formObj.tags.split(',') || ['uncategorised'];
            formObj.publik = !(!!formObj.publik);
            
            
            _.each(formObj.tags, function (rawTag) {
                cleantags.push(rawTag.trim());
            });
             
            formObj.tags = cleantags;

            successHandler = function (model, response) {
                self.activeNew = false; // unlock
                
                self.model.set({'id': response.model.id});
                collections.Bookmarks.origModels.push(self.model);
                
                $.shout('New bookmark saved!', 10, 'success');
                
                self.$el.fadeOut('slow', function () {
                    self.$el.remove();
                    location.hash = '#bookmarks';
                });
            };
            
            errorHandler = function (model, response) {
                self.activeNew = false; // unlock
                
                $.shout(errmsg, 10);
                self.$el.fadeOut('slow', function () {
                    self.$el.remove();
                    location.hash = '#bookmarks';
                });
            };
            
            this.model.save(formObj, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        cancelNew: function (e) { 
            e.preventDefault();
            
            var self = this;
            
            self.$el.fadeOut('slow', function () {
                self.$el.remove();
                location.hash = '#bookmarks';
            });
        },
        


        /*
            @Private
            @Void: handles clicking the delete link
            @Param: (Object) e - click event object
        */          
        deleteBookmark: function (e) {
            e.preventDefault();
            
            var errorHandler, 
                successHandler, 
                errmsg = (App.page === 'demo') ? 'Error, unauthorised user' : 'Error occured, bookmark not deleted';
                
            if (!confirm('Are you sure you want to delete this bookmark?')) {
                return false;
            } 
               
            successHandler = function (model, response) {
                this.unrender();
                $.shout(response.msg, 10, 'success');
                collections.Bookmarks.refresh();
            }.bind(this);
            
            errorHandler = function (model, response) {
                $.shout(errmsg, 10);
            }.bind(this);
            
            this.model.destroy({success: successHandler, error: errorHandler, wait: true});
        },


        /*
            @Private
            @Void: closes the bookmark editor form and displays the bookmark
            @Param: (Object) e - click event object
        */          
        cancelEdit: function (e) { 
            e.preventDefault();
            
            this.$('.bookmark-edit').fadeOut(function () {
                this.$('.bookmark-edit').empty();
                this.$('.bookmark-main').fadeIn();
                this.activeEditor = false; // lock editor
            }.bind(this));
        },
       
        


        /*
            @Private
            @Void: handles clicking the edit link and loads the bookmark editing form
            @Param: (Object) e - click event object
        */          
        loadEditor: function (e) {
            e.preventDefault();
            
            // prevent loading of editor while one is active
            if (this.activeEditor || this.activeNew) {
                return false;
            }
            
            var model = this.model.toJSON(), editTemplate;
            
            model.tags = model.tags.length > 1 ? model.tags.join(',') : model.tags[0];
            
            editTemplate = this.editTemplate.render(model);
            
            this.$('.bookmark-main').fadeOut(function () {
                this.$('.bookmark-edit').html(editTemplate).fadeIn();
                this.activeEditor = true;
            }.bind(this));
        },
        


        /*
            @Private
            @Void: updates the view of a changed bookmark model property
            @Param: (String) view - bookmark view that has changed
        */          
        update: function (view) {
            var div, privacy, tags, span;
            
            switch (view) {
            
                case 'title':
                    this.$('.bookmark-url').html(this.model.escape('title'));
                break;
                
                
                case 'notes':
                    this.$('.bookmark-notes').html(this.model.escape('notes'));
                break;
                
                
                case 'url':
                    this.$('.bookmark-url').attr({'href': this.model.escape('url')});
                break;
                
                
                case 'tags':
                    div = this.$('.bookmark-tags');
                    div.find('.b-tag').remove();
                    tags = this.model.get('tags');
                    
                    _.each(tags, function (tag) {
                        span = $('<span>', {
                            'class': 'label',
                            'html': tag.toLowerCase() 
                        });
                        
                        div.append(span);
                    });
                break;
                
                
                case 'publik':
                    div = this.$('.bookmark-tags'); 
                
                    div.find('#label').remove();
                
                    privacy = $('<span>', {
                        'id': 'label',
                        'html': this.model.get('publik') ? 'Public' : 'Private',
                        'class': this.model.get('publik') ? 'label label-important' : 'label label-info'
                    });
                
                    div.append(privacy);
                break;
            }
        },



        /*
            @Private
            @Object: formats a time integer to a date and returns an object 
            @Param: (Number) date - time integer
        */          
        formatDate: function (date) {
            var newdate,  obj = {}, 
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            if (date) {
                newdate = new Date(parseInt(date, 10));
            }else {
                newdate = new Date();
            }

            obj.day = newdate.getDate();
            obj.month = months[newdate.getMonth()];
            obj.year = newdate.getFullYear();
            
            return obj;
        },
        


        /*
            @Private
            @Object: returns a sanitized model object 
        */          
        getCleanModel: function () {
            var obj = {}, model = this.model, date = this.formatDate(model.get('date')), parser = document.createElement('a');
            
            obj.url = decodeURIComponent(model.get('url'));
            
            parser.href = obj.url;
            
            obj.notes = model.escape('notes');
            obj.title = model.escape('title');
            obj.tags = model.get('tags');
            obj.publik = model.get('publik');
            obj.starred = model.get('starred');
            obj.id = model.get('id');
            obj.hostname = parser.hostname;
                
            obj.day = date.day;
            obj.month = date.month;
            obj.year = date.year;
            
            return obj;
        }        
    });
}(Backbone, App.Views, App.Collections, EJS, jQuery));
/*
    @Module: App.Views.Bookmarks - renders bookmarks collection
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore
*/
(function (Backbone, views, $) {
    "use strict";
    
    views.Bookmarks = Backbone.View.extend({
    
        el: $('#bookmarks-table'),
        


        /*
            @Public
            @Constructor: (Void - chainable) binds collection events
        */        
        initialize: function () {
            _.bindAll(this, 'addBookmark', 'viewAllBookmarks', 'bookmarksHeader', 'render');
            
            $('.dropdown-toggle').dropdown();
            
            this.collection.on('add', this.addBookmark);
            this.collection.on('reset', this.viewAllBookmarks);
            
            return this;
        },
        
        
        render: function () {
            return this;
        },
        


        /*
            @Public
            @Void: appends a bookmark view the bookmarks table
            @Param: (Object) bookmarkModel - bookmark model
        */        
        addBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.append(bookmarkView.render().el);
        },
        

        
        newBookmark: function (bookmarkModel) { 
            var bookmarkView = new views.Bookmark({
                model: bookmarkModel
            });
            
            this.$el.html(bookmarkView.newBookmark().el);
        },
        


        /*
            @Public
            @Void: appends a header to the bookmarks table 
            @Param: (Object) bookmarkModel - bookmark model
        */ 
        bookmarksHeader: function () { 
            var header = $('<thead>'), tr = $('<tr>'), data = this.collection.info(), html = '', td;
            
            
            if (this.collection.filteredTag) {
                html += '<i class="icon-tags"></i> <span class="label label-important">' + this.collection.filteredTag.toUpperCase() + '</span> &nbsp; ';
            }
            
            html += 'Page ' + data.currentPage + ' of ' + data.totalPages; 
            
            if (this.collection.filteredTag) {
                html += '<a href="#bookmarks" class="close">&times;</a>';
            }
            
            td = $('<th>', {
                colspan: 2,
                html: html
            });
            
            tr.append(td);
            header.append(tr);
            
            this.$el.append(header);
        },
        


        /*
            @Public
            @Void: appends all bookmarks to the bookmarks table
        */ 
        viewAllBookmarks: function () {
            this.$el.fadeOut(function () {
                this.$el.empty();
                this.bookmarksHeader();
                this.collection.forEach(this.addBookmark);
                this.$el.fadeIn();
            }.bind(this));
        }        
    });
}(Backbone, App.Views, jQuery));
/*
    @Module: App.Views.Controls - renders application controls/menu
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore                  
                  - EJS                  
*/
(function (Backbone, models, views, Template, $) {
    "use strict";
    
    views.Controls = Backbone.View.extend({
    
        el: $('#controls'),
        
        
        controlsTemplate: new Template({url: '/javascripts/views/controls/tmpl/controls.ejs'}),
        
        
        newBookmarkTemplate: new Template({url: '/javascripts/views/controls/tmpl/new.ejs'}),
        
        
        events: {
            'click #new-bookmark-form .cancel': 'clearNewBookmark',
            
            'click .btn-group .limit a': 'changeCount',
            
            'click .btn-group .sort a': 'sort'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render', 'clearNewBookmark');
        },
        

        /*
            @Public
            @Void: loads template and renders controls view
        */          
        render: function () {
            var controlsTemplate, tags = this.collection.getTags();

            controlsTemplate = this.controlsTemplate.render({tags: tags, filteredTag: this.collection.filteredTag}); 
            this.$el.html(controlsTemplate);
            
            return this;
        },
        
        
        
        
        filterTags: function (tag) {
            var self = this;
            
            //We want to check if we are on the latest page and if its not of 
            // filtered models
            if (tag) {
                $.shout('Loading "' + tag + '" bookmarks.....', 0, 'info');
                self.collection.fetch({
                    data: {
                        skip: self.collection.info().totalRecords,
                        tag: tag
                    }, 
                    
                    type: 'GET', 
                    
                    success: function(collection, result, opts) {
                        if (result.length > 0) {
                            $.shout('Done!', 2, 'info');
                            _.each(result, function (model) {
                                var bookmark = new models.Bookmark(model);
                            
                                self.collection.origModels.push(bookmark);
                            });
                            
                            self.collection.filterTags(tag);
                            self.render();
                        }
                        else {
                            $.shout('Done!', 2, 'info');
                            self.collection.filterTags(tag);
                            self.render();                            
                        }
                    },
                    
                    error: function(collection, xhr, options) {
                        $.shout('Request failed!', 5, 'warning');
                    }
                });
            }             
        },
        
        
        


        /*
            @Private
            @Void: handles click events for changing limit of displayed bookmarks per page
            @Param: (Object) e - click event object
        */          
        changeCount: function (e) {
            e.preventDefault();
            var num = $(e.target).text();
             
            views.Pagination.changeCount(num);
        },
        
        
        clearNewBookmark: function (e) {
            e.preventDefault();
            
            $('#new-bookmark-table').fadeOut(function () {
                $('#new-bookmark-table').remove();
                $('#bookmarks-table, #pagination').fadeIn();
            });
        },
        


        /*
            @Private
            @Void: handles click events for changing display order of bookmarks
            @Param: (Object) e - click event object
        */        
        sort: function (e) {
            e.preventDefault();
            
            var classname = $(e.target).attr('class');
            
            if (classname !== this.collection.sortOrder) {
                this.collection.changeSortOder(classname);
            }
        }
    });
}(Backbone, App.Models, App.Views, EJS, jQuery));
/*
    @Module: Routes::Router - handles app navigation
*/
(function(views, routes) {
    "use strict";
    
    routes.Router = Backbone.Router.extend({
        routes: {
            'bookmarks': 'loadBookmarks',
            
            '': 'loadBookmarks',
            
            'user/account': 'loadAccount',
            
            'bookmarks/tags/:tag': 'filterTags',
            
            'bookmarks/page/:num': 'goTo',
            
            'bookmarks/new': 'newBookmark'
        },
        
        
        loadAccount: function () {
            views.Controller.loadAccount();
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.account').addClass('active');
            }
        },
        
        
        goTo: function (num) {
            views.Controller.goTo(num); 
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        },
        
        
        loadBookmarks: function () {
            views.Controller.loadBookmarks();

            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active'); 
            }                
        },
        
        
        newBookmark: function () {
            views.Controller.newBookmarkView();
            
            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        },
        
        
        filterTags: function (tag) {
            views.Controller.filterTags(tag); 

            if (App.page !== 'demo') {
                $('.nav-pills li.active').removeClass('active');
                $('.nav-pills li.bookmarks').addClass('active');
            }
        }
    });
}(App.Views, App.Routes));
/*
    @Module: App.Views.Pagination - renders pagination for bookmarks
    @Dependencies - jQuery
                  - Backbone 
                  - EJS 
                  - UnderScore
*/
(function(Backbone, views, models, Template, $) {
    "use strict";
    
    views.Pagination = Backbone.View.extend({
    
        el: $('#pagination'),
        
        
        paginationTemplate: new Template({url: '/javascripts/views/pagination/tmpl/pagination.ejs'}),
        
        
        data: {},
        
        
        events: {
            'click a.next': 'gotoNext',
            'click a.prev': 'gotoPrev'
        },
        

        /*
            @Public
            @Constructor: binds collection events
        */        
        initialize: function () {
            _.bindAll(this, 'render', 'changeCount', 'gotoNext', 'gotoPage', 'gotoPrev');
             
            this.collection.on('reset', this.render);
            this.collection.on('remove', function (model) {
                this.collection.removeFromOGModels(model.cid);
                this.render();
                views.Controls.render();
            }.bind(this)); 

            return this;            
         },
         
         
        /*
            @Public
            @Void: loads the pagination template and renders it.
        */          
        render: function () {
            this.data = this.collection.info();
            
            var html = this.paginationTemplate.render(this.data);
            
            this.$el.html(html).fadeIn();
            
            return this;
        },
         


        /*
            @Public
            @Void: loads the previous group of pages in the pagination view
            @Param: (Object) e - click event object
        */                   
        gotoPrev: function (e) {
            e.preventDefault();
            
            this.collection.previousGroup();
            this.render();
        },
         


        /*
            @Public
            @Void: loads the next group of available pages in the pagination view
            @Param: (Object) e - click event object
        */          
        gotoNext: function (e) {
            e.preventDefault();
             
            this.collection.nextGroup();
            this.render();
        },        
         


        /*
            @Public
            @Void: loads a page from the collection and call re-renders pagination
            @Param: (Number) page - the number of the page to go to
        */            
        gotoPage: function (num) {
            var self = this, data;

            //We want to check if we are on the latest page and if its not of 
            // filtered models
            if (num >= self.collection.info().totalPages && !self.collection.allFetched) {
                $.shout('Loading more bookmarks.....', 0, 'info');
                
                data = {
                    skip: self.collection.info().totalRecords
                }
                
                // if there are some filtered tags
                if (self.collection.filteredModels) {
                    data.tag = self.collection.filteredTag; 
                }
                
                self.collection.fetch({
                    data: data, 
                    
                    type: 'GET', 
                    
                    success: function(collection, result, opts) {
                        if (result.length > 0) {
                            $.shout('Done!', 2, 'info');
                            _.each(result, function (model) {
                                var bookmark = new models.Bookmark(model);
                            
                                self.collection.origModels.push(bookmark);
                            });

                            if (self.collection.filteredModels) {
                                self.collection.filterTags(self.collection.filteredTag);
                            }
                            
                            self.collection.goTo(num);
                        }
                        else {
                            self.collection.allFetched = true;
                            $.shout('All bookmarks have been loaded!', 10, 'info');
                            self.collection.goTo(num);
                        }
                    },
                    
                    error: function(collection, xhr, options) {
                        $.shout('Request failed!', 10, 'warning');
                    }
                });
                
                return;
            }
            
            self.collection.goTo(num);
        },
        

        /*
            @Public
            @Void: clears any filtered tag
        */         
        reset: function () {
            this.collection.resetFilteredModels();
            this.render();
        },



        /*
            @Public
            @Void: sets number of bookmarks to be displayed per page and reloads current page
            @Param: (Number) num - the number of bookmarks par page
        */         
        changeCount: function (num) {
            this.collection.setLimit(num);
            location.hash = '#pages/' + this.collection.currentPage;
        }
    });
}(Backbone, App.Views, App.Models, EJS, jQuery));
/*
    @Module: App.Views.Controller - initializes application views
    @Dependencies - jQuery
                  - Backbone
                  - UnderScore
*/
(function (Backbone, models, views, collections, routes, $) {
    "use strict";
    
    views.Controller = Backbone.View.extend({
    
        el: $('#app-body'),
        
        
        router: {},
        
        
        profile: {},
        
        
        activeView: '',
        
        
        bookmarks: {},
        
        
        controls: {},
        
        
        pagination: {},
        
        
        /*
            @Api:           public
            @Constructor:   initializes app views 
        */
        initialize: function () {
            _.bindAll(this, 'loadAccount', 'newBookmarkView', 'filterTags', 'loadBookmarks', 'goTo', 'assign');

            this.$('#profile').hide();

            this.router = new routes.Router();
            
            this.bookmarks = new views.Bookmarks({
                collection: new collections.Bookmarks(this.collection)
            });
            
            this.controls = new views.Controls({
                collection: this.bookmarks.collection
            });
            
            this.pagination = new views.Pagination({
                collection: this.bookmarks.collection
            });
            
            this.profile = new views.Profile(); 
            
            
            views.Controls = this.controls;
            views.Bookmarks = this.bookmarks;
            views.Profile = this.profile;
            views.Pagination = this.pagination;
            collections.Bookmarks = this.bookmarks.collection;

            
            this.bookmarks.collection.pager();
            
            this.assign({
                '#profile': this.profile,
                '#controls': this.controls, 
                '#bookmarks-table': this.bookmarks,
                '#pagination': this.pagination
            });
            
            return this;
        },

        
        /*
            @Api:       public - displays profile page
            @returns:   void
        */
        loadAccount: function () {
            this.$('.home-div, #home, #bookmarks-table').fadeOut(function () {
                this.$('#bookmarks-table').empty();
                this.$('#profile').fadeIn();
                this.activeView = 'profile';
            }.bind(this));
        },
        


        /*
            @Api:       public - resets and displays bookmarks collection
            @Returns:   void
        */        
        loadBookmarks: function () {            
            if (this.activeView === 'profile') {
                $('#profile').fadeOut(function () {
                    $('#home, .home-div').fadeIn();
                    this.pagination.reset();
                    this.controls.render();
                    this.activeView = 'home';
                }.bind(this)); 
                
                return;
            }
            
            $('.home-div').fadeIn();
            this.pagination.reset();
            this.controls.render();
            this.activeView = 'home';
        },
        
        
        
        newBookmarkView: function () {
            var self = this,  model;
            
            $('#pagination').fadeOut(function () {
               model = new models.Bookmark();
                model = model.createUrlRoot('/bookmarks');
            
                self.bookmarks.newBookmark(model);
            });
        },
        


        /*
            @Api:       public - loads and displays a page of bookmarks
            @returns:   void 
            @param:     (Number) num - page number
        */        
        goTo: function (num) {
            this.pagination.gotoPage(num);              
        },
        


        /*
            @Api:       public - filters and displays bookmarks containing a tag
            @Returns:   void 
            @param:     (String) tag - tag to be filtered
        */         
        filterTags: function (tag) {
            this.controls.filterTags(tag);
            this.activeView = 'filteredTags';              
        },
        
        
        assign: function (selector, view) {
            var selectors;
            
            if (_.isObject(selector)) {
                selectors = selector;
            }
            else {
                selectors = {};
                selectors[selector] = view;
            }
            
            if (!selectors) {
                return;
            }
            
            _.each(selectors, function (view, selector) {
                view.setElement(this.$(selector)).render();
            }, this);
        }        
    });
}(Backbone, App.Models, App.Views, App.Collections, App.Routes, jQuery));
