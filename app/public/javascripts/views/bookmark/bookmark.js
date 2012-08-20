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
            });

            this.model.bind('change:url', function () {
                $this.update('url');
            });
            
            this.model.bind('change:title', function () {
                $this.update('title');
            });

            this.model.bind('change:notes', function () {
                $this.update('notes');
            });            
            
            this.model.bind('change:starred', function () {
                $this.update('starred');
            });

            this.model.bind('change:tags', function () {
                $this.update('tags');
            });            
 
            this.render();
        },
        

        render: function () {
            var model = this.model.toJSON(),
                bookmarkTemplate;
                
            model.date = this.formatDate(model.date);
            bookmarkTemplate = this.bookmarkTemplate.render(model);
                
            $(this.el).append(bookmarkTemplate);
            
            return this;
        },
        
        unrender: function () {
            var $this = this;
            
            $(this.el).css('background', '#ffff99');
            $(this.el).fadeOut(function () {
                $($this.el).remove();
            });
        },
        
        
        saveEdit: function (e) {
            e.preventDefault();
            var cleantags = [];
            
            var formObj = {}, 
                $this = this, 
                editForm = $(this.el).find('.bookmark-edit-form'),
                editFormDiv = $(this.el).find('.bookmark-edit'),
                formValues = editForm.serializeArray(),
                successHandler,
                errorHandler;
            
            formValues.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            formObj.tags = formObj.tags.split(',') || [formObj.tags];
            
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
                        
                    $($this.el).find('.bookmark-main').fadeIn(function () {
                        Views.Bookmarks.shout.call($this, response.msg, 5);
                    });
                });
            };
            
            errorHandler = function (model, response) {
                var prevAttributes = $this.model.previousAttributes(); 
                $this.model.set(prevAttributes);
                
                editFormDiv.fadeOut(function () {
                    editFormDiv.remove();
                    $this.activeEditor = false;
                        
                    $($this.el).find('.bookmark-main').fadeIn(function () {
                        Views.Bookmarks.shout.call($this, response.msg, 5);
                    });
                });
            };
                    
            this.model.save(null, {success: successHandler, error: errorHandler});
        },
        
        
        deleteBookmark: function (e) {
            e.preventDefault();
            
            var $this = this,
                errorHandler,
                successHandler;
                
            if (!confirm('Are you sure you want to delete this bookmark?')) {
                return;
            } 
               
            successHandler = function (model, response) {
                $this.unrender();
                Views.Bookmarks.shout.call($this, response.msg, 5);
            };
            
            errorHandler = function (model, response) {
                Views.Bookmarks.shout.call($this, response.msg, 5);
            };
            
            this.model.destroy({success: successHandler, error: errorHandler});
        },
        
        
        cancelEdit: function (e) {
            
            if(e) e.preventDefault();
            
            var $this = this;
            
            $(this.el).find('.bookmark-edit-form').fadeOut(function () {
                $($this.el).find('.bookmark-edit-form').remove();
                $($this.el).find('.bookmark-main').fadeIn();
                $this.activeEditor = false;
            });
        },
        
        
        loadEditor: function (e) {
            e.preventDefault();
            
            if (this.activeEditor) {
                return;
            }
            
            var $this = this, 
                model = this.model.toJSON(),
                editTemplate;
            
            model.tags = model.tags.length > 1 ? model.tags.join(',') : model.tags[0];
            
            editTemplate = this.editTemplate.render(model);
            
            $($this.el).find('.bookmark-main').fadeOut(function () {
                $($this.el).find('.bookmark-middle-td').hide().append(editTemplate).fadeIn();
                $this.activeEditor = true;
            });
        },
        
        
        hideEdit: function () {
            $(this.el).find('.edit').addClass('hidden');
        },
        
        
        update: function (view) {
            if (view === 'title') {
                $(this.el).find('.bookmark-url').html(this.model.get('title'));   
            }
            
            if (view === 'notes') {
                $(this.el).find('.bookmark-notes').html(this.model.get('notes'));   
            }

            if (view === 'url') {
                $(this.el).find('.bookmark-url').attr({'href': this.model.get('url')});   
            }
            
            if (view === 'tags') {
                var div = $(this.el).find('.bookmark-tags');
                
                div.find('.label').remove();
                
                (this.model.get('tags')).forEach(function (tag) {
                    var span = $('<span>', {
                        'class': 'label',
                        'html': tag.toLowerCase() 
                    });
                    
                    div.append(span);
                });                    
            }
        },
        

        getFormObject: function (arr) {
            var formObj = {};
            
            arr.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;

        },

        formatDate: function (date) {
            var newdate = new Date(parseInt(date)).toString().substring(4, 16);
            
            return newdate;
        }        
    });
}(App.Views, App.Models, jQuery));
