/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, $) {
    "use strict";
    
    Views.Bookmark = Backbone.View.extend({
    
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

            this.model.bind('change:publik', function () {
                $this.update('publik');
            })

            .bind('change:url', function () {
                $this.update('url');
            })
            
            .bind('change:title', function () {
                $this.update('title');
            })

            .bind('change:notes', function () {
                $this.update('notes');
            })            
            
            .bind('change:starred', function () {
                $this.update('starred');
            })

            .bind('change:tags', function () {
                $this.update('tags');
            });            
 
            this.render();
            return this;
        },
        

        render: function () {
            var model = this.model.toJSON(), bookmarkTemplate;
                
            model.date = this._formatDate(model.date);
            bookmarkTemplate = this.bookmarkTemplate.render(model);   
            this.$el.append(bookmarkTemplate);
            
            return this;
        },
        
        
        unrender: function () {
            this.$el.css('background', '#ffff99');
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
            
            formValues.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });

            
            formObj.tags = formObj.tags.split(',') || [formObj.tags];
            formObj.publik = !(!!formObj.publik);
            
            formObj.tags.forEach(function (rawTag) {
                cleantags.push(trim(rawTag));
            });
             
            formObj.tags = cleantags;

            this.model.set(formObj);

            successHandler = function (model, response) {
                var prevAttributes = $this.model.previousAttributes(); 
                $this.model.set(prevAttributes);
                
                editFormDiv.fadeOut(function () {
                    editFormDiv.remove();
                    $this.activeEditor = false;
                        
                    $this.$('.bookmark-main').fadeIn(function () {
                        $.shout(response.msg, 5);
                    });
                });
            };
            
            errorHandler = function (model, response) {
                var prevAttributes = $this.model.previousAttributes(); 
                $this.model.set(prevAttributes);
                
                editFormDiv.fadeOut(function () {
                    editFormDiv.remove();
                    $this.activeEditor = false;
                        
                    $this.$('.bookmark-main').fadeIn(function () {
                        $.shout(response.msg, 5);
                    });
                });
            };
                    
            this.model.save(null, {success: successHandler, error: errorHandler});
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
                $.shout(response.msg, 5);
            }.bind(this);
            
            this.model.destroy({success: successHandler, error: errorHandler});
        },
        
        
        cancelEdit: function (e) { 
            if (e) {
                e.preventDefault();
            }
            
            this.$('.bookmark-edit-form').fadeOut(function () {
                this.$('.bookmark-edit-form').remove();
                this.$('.bookmark-main').fadeIn();
                this.activeEditor = false;
            }.bind(this));
        },
        
        
        loadEditor: function (e) {
            if (e) {
                e.preventDefault();
            }
            
            if (this.activeEditor) {
                return false;
            }
            
            var model = this.model.toJSON(), editTemplate;
            
            model.tags = model.tags.length > 1 ? model.tags.join(',') : model.tags[0];
            
            editTemplate = this.editTemplate.render(model);
            
            this.$('.bookmark-main').fadeOut(function () {
                this.$('.bookmark-middle-td').hide().append(editTemplate).fadeIn();
                this.activeEditor = true;
            }.bind(this));
        },
        
        
        update: function (view) {
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
                var div = this.$('.bookmark-tags');
                
                div.find('.label').remove();
                
                (this.model.get('tags')).forEach(function (tag) {
                    var span = $('<span>', {
                        'class': 'label',
                        'html': tag.toLowerCase() 
                    });
                    
                    div.append(span);
                });
                

            }
            
            if (view === 'publik') {
                var div = this.$('.bookmark-tags'), privacy;
                
                div.find('#label').remove();
                
                privacy = $('<span>', {
                    'id': 'label',
                    'html': this.model.get('publik') ? 'Public' : 'Private',
                    'class': this.model.get('publik') ? 'label label-important' : 'label label-info'
                });
                
                div.append(privacy);  
            }
        },


        _formatDate: function (date) {
            var newdate = new Date(parseInt(date)).toString().substring(4, 16);
            
            return newdate;
        }        
    });
}(App.Views, App.Models, jQuery));
