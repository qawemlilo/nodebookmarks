/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, Models, $) {
    "use strict";
    
    views.Bookmark = Backbone.View.extend({
    
        tagName: 'tr',
        
        
        className: 'bookmark',
        
        
        events: {
            'dblclick': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-edit-link': 'loadEditor',
            
            'click .bookmark-main-edit .bookmark-delete': 'deleteBookmark',
            
            'click .cancel': 'cancelEdit',
            
            'submit .bookmark-edit-form': 'saveEdit'
        },
        
        
        activeEditor: false,
        
        
        editTemplate: new EJS({url: '/javascripts/views/bookmark/tmpl/edit.ejs'}),
        
        
        bookmarkTemplate: new EJS({url: '/javascripts/views/bookmark/tmpl/bookmark.ejs'}),
        
        
        initialize: function () {
            var $this = this;
            
            _.bindAll(this, 'render', 'unrender', 'saveEdit', 'cancelEdit', 'update', 'loadEditor', 'deleteBookmark');

            this.model.on('change:publik', function () {
                $this.update('publik');
            })

            .on('change:url', function () {
                $this.update('url');
            })
            
            .on('change:title', function () {
                $this.update('title');
            })

            .on('change:notes', function () {
                $this.update('notes');
            })            
            
            .on('change:starred', function () {
                $this.update('starred');
            })

            .on('change:tags', function () {
                $this.update('tags');
            });            
 
            this.render();
            return this;
        },
        

        render: function () {
            var model = this.model.toJSON(), bookmarkTemplate, date = this.formatDate(model.date);
                
            model.day = date.day;
            model.month = date.month;
            model.year = date.year;
            
            bookmarkTemplate = this.bookmarkTemplate.render(model);   
            this.$el.append(bookmarkTemplate);
            
            return this;
        },
        
        
        unrender: function () {
            this.$el.addClass('highlight');
            this.$el.fadeOut(function () {
                this.$el.remove();
            }.bind(this));
            
            return this;
        },
        
        
        saveEdit: function (e) {
            e.preventDefault();
            
            var cleantags = [], formObj = {}, $this = this, successHandler, errorHandler, 
                editForm = this.$('.bookmark-edit-form'),
                editFormDiv = this.$('.bookmark-edit'),
                formValues = editForm.serializeArray();
            
            _.each(formValues, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });

            
            formObj.tags = formObj.tags.split(',') || [formObj.tags];
            formObj.publik = !(!!formObj.publik);
            
            _.each(formObj.tags, function (rawTag) {
                cleantags.push(trim(rawTag));
            });
             
            formObj.tags = cleantags;

            successHandler = function (model, response) {
                editFormDiv.fadeOut(function () {
                    editFormDiv.empty().hide();
                    $this.activeEditor = false;
                        
                    $this.$('.bookmark-main').fadeIn(function () {
                        $.shout(response.msg, 5);
                    });
                });
            };
            
            errorHandler = function (model, response) {
                editFormDiv.fadeOut(function () {
                    editFormDiv.empty().hide();
                    $this.activeEditor = false;
                        
                    $this.$('.bookmark-main').fadeIn(function () {
                        $.shout(response.msg || 'Error occured, bookmark not updated', 5);
                    });
                });
            };
                    
            this.model.save(formObj, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        deleteBookmark: function (e) {
            e.preventDefault();
            
            var errorHandler, successHandler;
                
            if (!confirm('Are you sure you want to delete this bookmark?')) {
                return false;
            } 
               
            successHandler = function (model, response) {
                this.unrender();
                $.shout(response.msg, 5);
            }.bind(this);
            
            errorHandler = function (model, response) {
                $.shout(response.msg  || 'Error occured, bookmark not deleted', 5);
            }.bind(this);
            
            this.model.destroy({success: successHandler, error: errorHandler, wait: true});
        },
        
        
        cancelEdit: function (e) { 
            e.preventDefault();
            
            this.$('.bookmark-edit').fadeOut(function () {
                this.$('.bookmark-edit').empty();
                this.$('.bookmark-main').fadeIn();
                this.activeEditor = false;
            }.bind(this));
        },
        
        
        loadEditor: function (e) {
            e.preventDefault();
            
            if (this.activeEditor) {
                return false;
            }
            
            var model = this.model.toJSON(), editTemplate;
            
            model.tags = model.tags.length > 1 ? model.tags.join(', ') : model.tags[0];
            
            editTemplate = this.editTemplate.render(model);
            
            this.$('.bookmark-main').fadeOut(function () {
                this.$('.bookmark-edit').html(editTemplate).fadeIn();
                this.activeEditor = true;
            }.bind(this));
        },
        
        
        update: function (view) {
            var div, privacy, tags;
            if (view === 'title') {
                this.$('.bookmark-url').html(this.model.get('title'));   
            }
            
            if (view === 'notes') {
                this.$('.bookmark-notes').html(this.model.get('notes'));   
            }

            if (view === 'url') {
                this.$('.bookmark-url').attr({'href': this.model.get('url')});   
            }
            
            if (view === 'tags') {
                div = this.$('.bookmark-tags');
                
                div.find('.b-tag').remove();
                
                tags = this.model.get('tags');
                
                _.each(tags, function (tag) {
                    var span = $('<span>', {
                        'class': 'label',
                        'html': tag.toLowerCase() 
                    });
                    
                    div.append(span);
                });
                

            }
            
            if (view === 'publik') {
                div = this.$('.bookmark-tags'); 
                
                div.find('#label').remove();
                
                privacy = $('<span>', {
                    'id': 'label',
                    'html': this.model.get('publik') ? 'Public' : 'Private',
                    'class': this.model.get('publik') ? 'label label-important' : 'label label-info'
                });
                
                div.append(privacy);  
            }
        },


        formatDate: function (date) {
            var newdate = new Date(parseInt(date, 10)),  obj = {}, 
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            obj.day = newdate.getDay();
            obj.month = months[newdate.getMonth()];
            obj.year = newdate.getFullYear();
            
            return obj;
        }        
    });
}(App.Views, App.Models, jQuery));
