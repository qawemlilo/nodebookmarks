/*
    Bookmark view
*/
define(['text!templates/bookmark.html', 'text!templates/new.html', 'text!templates/edit.html'], 
    
    function (bookmarkTemplate, newBookmarkTemplate, editTemplate) {
    
    var Bookmark = Backbone.View.extend({
    
        tagName: 'tr',
        
        
        
        
        className: 'bookmark',
        
        
        
        
        bookmarkTemplate: _.template(bookmarkTemplate),
        
        
        
        
        newBookmarkTemplate: _.template(newBookmarkTemplate),
        
        
        
        
        
        editTemplate: _.template(editTemplate), 
        
        
        
        
        activeNew: false,
        
        
        
        
        
        activeEditor: false,
        
        
        
        
        
        events: {
            'dblclick': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-edit-link': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-delete': 'deleteBookmark',
            
            'click .cancel': 'cancelEdit',
            
            'submit .bookmark-edit-form': 'saveEdit',
            
            'click #new-bookmark-form .cancel': 'cancelNew',
            
            'submit #new-bookmark-form': 'saveNew'
        },
        
        
        
        
        app: {},
        

        
        

        /*
            Binds model events and initializes bookmark 
        */        
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, 'render', 'unrender', 'saveEdit', 'cancelNew', 'newBookmark', 'saveNew', 'cancelEdit', 'update', 'loadEditor', 'deleteBookmark', 'getCleanModel');       
            
            self.app = opts.app;
            
            self.model.on('change', function () {
                var attrs = ['publik', 'url', 'title', 'notes', 'starred', 'tags'];
                
                _.each(attrs, function(attr) {
                    if (self.model.hasChanged(attr)) {
                        self.update(attr);
                    }
                });
            });     
            
            return self;
        },
        
        
        

        

        /*
            Renders a bookmark view
        */        
        render: function () {
            var self = this, model = self.getCleanModel(), template;

            template = self.bookmarkTemplate(model);
 
            self.$el.html(template);
            
            return this.el;
        },
        
        
        
        
        
        /*
            Removes a bookmark view
        */         
        unrender: function () {
            this.$el.addClass('highlight')
            
            .fadeOut(function () {
                this.$el.remove();
            }.bind(this));
        },
        
        
        
        
        
        newBookmark: function () {
            var date = this.formatDate(), template = this.newBookmarkTemplate(date);
             
            this.activeNew = true;
            this.$el.append(template);
            
            return this;
        },
        
        
        
        
        
        /*
            Handles clicking the edit link and loads the bookmark editing form
            @Param: (Object) e - click event object
        */          
        loadEditor: function (e) {
            e.preventDefault();
            
            var self = this, model = self.model.toJSON(), template;
            
            // prevent loading of editor while one is active
            if (self.activeEditor || self.activeNew) {
                return false;
            }
            
            
            
            model.tags = model.tags.length > 1 ? model.tags.join(',') : model.tags[0];
            
            template = self.editTemplate(model);
            
            self.$('.bookmark-main').fadeOut(function () {
                self.$('.bookmark-edit').html(template).fadeIn();
                self.activeEditor = true;
            });
        },
        
        
        
        
        
        
        
        /*
            Handles the submitted bookmark form data
            @Param: (Object) e - submit event object
        */         
        saveNew: function (e) {
            e.preventDefault();
            
            var formObj, 
                successHandler, 
                errorHandler, 
                self = this,
                errmsg;
            
            if (self.app.page === 'demo') { 
                errmsg = 'Error, unauthorised user';
            }
            else {
                errmsg = 'Error occured, bookmark not saved';
            }

            formObj = self.serializeForm('#new-bookmark-form');

            successHandler = function (model, response) {
                self.activeNew = false; // unlock
                
                self.model.set({'id': response.model.id});
                self.app.collections.bookmarks.origModels.push(self.model);
                
                $.shout('New bookmark saved!', 5, 'success');
                
                self.$el.fadeOut('slow', function () {
                    self.$el.remove();
                    location.hash = '#bookmarks';
                });
            };
            
            errorHandler = function (model, response) {
                self.activeNew = false; // unlock
                
                $.shout(errmsg, 5);
                self.$el.fadeOut('slow', function () {
                    self.$el.remove();
                    location.hash = '#bookmarks';
                });
            };
            
            self.model.save(formObj, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        
        
        
        
        /*
            Handles clicking the cancel button on a new bookmark form
            @Param: (Object) e - click event object
        */          
        cancelNew: function (e) { 
            e.preventDefault();
            
            var self = this;
            
            self.$el.fadeOut('slow', function () {
                self.$el.remove();
                location.hash = '#bookmarks';
            });
        },
        
        
        
        
        
        
        
        
        
        /*
            Handles the submitted bookmark form data after editing
            @Param: (Object) e - submit event object
        */         
        saveEdit: function (e) {
            e.preventDefault();
            
            var cleantags = [],
                self = this,            
                formObj, 
                successHandler, 
                errorHandler, 
                editFormDiv = self.$('.bookmark-edit'),
                errmsg = (self.app.page === 'demo') ? 'Error, unauthorised user' : 'Error occured, bookmark not updated';

            formObj = self.serializeForm('.bookmark-edit-form');

            successHandler = function (model, response) {
                self.activeEditor = false; // unlock editor
                $.shout(response.msg, 5, 'success');
                
                self.app.views.controls.render(); // refresh tags
            };
            
            errorHandler = function (model, response) {
                self.activeEditor = false; // unlock editor
                
                $.shout(errmsg, 5);
            };
            
            editFormDiv.fadeOut(function () {
                editFormDiv.empty().hide();
                self.$('.bookmark-main').fadeIn();
            });
            
            self.model.save(formObj, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        
        
        
        
        /*
            Closes the bookmark editor form and displays the bookmark
            @Param: (Object) e - click event object
        */          
        cancelEdit: function (e) { 
            e.preventDefault();
            
            var self = this
            
            self.$('.bookmark-edit').fadeOut(function () {
                self.$('.bookmark-edit').empty();
                self.$('.bookmark-main').fadeIn();
                self.activeEditor = false; // lock editor
            });
        },
        
        
        
        
        
        
        
        
        
        
        /*
            Updates the view of a changed bookmark model property
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
            Handles clicking the delete link
            @Param: (Object) e - click event object
        */          
        deleteBookmark: function (e) {
            e.preventDefault();
            
            var self = this,
                errorHandler, 
                successHandler, 
                errmsg = (self.app.page === 'demo') ? 'Error, unauthorised user' : 'Error occured, bookmark not deleted';
                
            if (!confirm('Are you sure you want to delete this bookmark?')) {
                return false;
            } 
               
            successHandler = function (model, response) {
                self.unrender();
                $.shout(response.msg, 5, 'success');
                self.app.collections.bookmarks.refresh();
            };
            
            errorHandler = function (model, response) {
                $.shout(errmsg, 5);
            };
            
            self.model.destroy({success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        
        
        
        
        
        
        
        /*
        */          
        serializeForm: function (id) {
            var formValues = this.$(id).serializeArray(), obj = {}, cleantags = [];
            
            _.each(formValues, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    obj[fieldObj.name] = fieldObj.value;
                }
            });
            
            if (!obj.tags) {
                obj.tags = ['uncategorised'];
            }
            else {
                obj.tags = obj.tags.split(',') || [obj.tags];
                obj.publik = !(!!obj.publik);
            
                _.each(obj.tags, function (rawTag) {
                    cleantags.push(rawTag.trim());
                });
             
                obj.tags = cleantags;
            }
            
            return obj;
        },
        
        
        
        
        
        
        /*
            Formats an integer to a date and returns an object 
            @Param: (Number- Int) date - time in milliseconds
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
            Returns a sanitized model object 
        */          
        getCleanModel: function () {
            var obj = {}, model = this.model, date = this.formatDate(model.get('date')), parser = document.createElement('a');
            
            
            obj.url = decodeURIComponent(model.get('url'));
            
            if (obj.url.indexOf('http://') < 0 && obj.url.indexOf('https://') < 0) {
                obj.url = 'http://' + obj.url;
            }
            
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

    return Bookmark;    
});
