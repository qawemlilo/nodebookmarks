/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models) {
"use strict";
    Views.Bookmark = Backbone.View.extend({
    
        tagName: 'tr',
        
        className: 'bookmark',
        
        events: {
            'click .bookmark-main-edit .bookmark-edit': 'loadEditor',
            
            'click .cancel': 'cancelEdit',
            
            'submit .bookmark-edit-form': 'saveEdit'
        },
        
        
        initialize: function () {
            var $this = this;
            
            _.bindAll(this, 'render', 'bookmarkTemplate', 'saveEdit', 'cancelEdit', 'editTemplate', 'update', 'loadEditor');

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
            var $this = this;
            
            var data = this.model.toJSON();
            data.date = new Date(parseInt(data.date)).toString().substring(4, 16);
            
            var tds = new EJS({url: '/javascripts/views/tmpl/bookmark.ejs'}).render(data);
                
            $($this.el).append(tds);
            
            return this;
        },
        
        
        saveEdit: function (e) {
            e.preventDefault();
            
            var formObj = {}, $this = this, 
                editForm = $(this.el).find('.bookmark-edit-form'),
                editFormDiv = $(this.el).find('.bookmark-edit'),
                formValues = editForm.serializeArray();
            
            formValues.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            formObj.tags = formObj.tags.split(',') || [formObj.tags];
            
            this.model.set(formObj);
            this.model.save(null, {
                success: function (model, res) {
                    editFormDiv.fadeOut(function () {
                        editFormDiv.remove();
                        
                        $($this.el).find('.bookmark-main').fadeIn(function () {
                            Views.Settings.shout.call($this, res.msg, 5);
                        });
                    });
                },
                
                error: function (model, res) {
                    $this.model.set(model);
                    
                    editFormDiv.fadeOut(function () {
                        editFormDiv.remove();
                        
                        $($this.el).find('.bookmark-main').fadeIn(function () {
                            Views.Settings.shout.call($this, res.msg, 5);
                        });
                    });
                }
            });
        },
        
        
        cancelEdit: function (e) {
            e.preventDefault();
            
            var $this = this;
            
            $($this.el).find('.bookmark-edit-form').fadeOut(function () {
                $($this.el).find('.bookmark-edit-form').remove();
                $($this.el).find('.bookmark-main').fadeIn();
            });
        },
        
        
        loadEditor: function (e) {
            e.preventDefault();
            
            var $this = this, 
                model = this.model.toJSON(),
                editTemplate;
            
            model.tags = model.tags.length > 1 ? model.tags.join(', ') : model.tags[0];
            editTemplate = new EJS({url: '/javascripts/views/tmpl/edit.ejs'}).render(model)
            
            $($this.el).find('.bookmark-main').fadeOut(function () {
                $($this.el).find('.bookmark-middle-td').hide().append(editTemplate).fadeIn();
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
                
                div.empty();
                
                (this.model.get('tags')).forEach(function (tag) {
                    var span = $('<span>', {
                        'class': 'tag',
                        'html': tag.toLowerCase() 
                    });
                    
                    div.append(span);
                });                    
            }
        },
        
        
        bookmarkTemplate: function (model) {
            var tds = [],
            
            date = new Date(parseInt(model.get('date'))).toString().substring(4, 16),
            
            leftTD = $('<td>', {
                'class': 'bookmark-left-td',
            }),
            
            middleTD = $('<td>', {
                'class': 'bookmark-middle-td',
            }), 
           
            bookmarkLeft = $('<div>', {
                'class': 'bookmark-left'
            }),

            bookmarkLeftDate = $('<div>', {
                'class': 'bookmark-date',
                'html': date
            }), 

            bookmarkLeftStar = $('<div>', {
                'class': 'bookmark-starred',
            }),

            bookmarkMain = $('<div>', {
                'class': 'bookmark-main'
            }), 
            
            bookmarkMainLink = $('<div>', {
                'class': 'bookmark-main-link'
            }),

            bookmarkMainTags = $('<div>', {
                'class': 'bookmark-tags'
            }),             
            
            bookmarkMainNotes = $('<div>', {
                'class': 'bookmark-notes',
                'html': model.get('notes')
            }), 
            
            url = $('<a>', {
                'href': model.get('url'),
                'class': 'bookmark-url',
                'html': model.get('title'),
                'target': '_blank',
                'title': model.get('notes')
            }),
            
            bookmarkMainEdit = $('<div>', {
                'class': 'bookmark-main-edit'
            }),             
    
            editBookmark = $('<a>', {
                'class': 'bookmark-edit',
                'href': '#edit/' + model.cid,
                'html': 'Edit'
            });
            
            //Left side
            bookmarkLeft.append(bookmarkLeftDate); 
            leftTD.append(bookmarkLeft);
            tds.push(leftTD);
            
            //Center, main
            bookmarkMainLink.append(url);
            bookmarkMainEdit.append(editBookmark);
            (model.get('tags')).forEach(function(tag) {
                var span = $('<span>', {
                    'class': 'tag',
                    'html': tag 
                });
                
                bookmarkMainTags.append(span);
            });
            
            bookmarkMain.append(bookmarkMainLink);
            bookmarkMain.append(bookmarkMainNotes);
            bookmarkMain.append(bookmarkMainTags);
            bookmarkMain.append(bookmarkMainEdit);
            middleTD.append(bookmarkMain);
            tds.push(middleTD);
            
            return tds;
        },
        

        editTemplate: function (model) {
            var tags = (model.get('tags')).length > 1 ? (model.get('tags')).join(', ') : (model.get('tags'))[0],
            
            container = $('<div>', {
                'class': 'bookmark-edit'
            }),
            
            form = $('<form>', {
                'class': 'bookmark-edit-form',
                'name': 'edit-form',
                'action': ''
            }),
            
            inputUrl = $('<input>', {
                'class': 'input',
                'name': 'url',
                'type': 'text',
                'value': model.get('url')
            }),
            
            inputTitle = $('<input>', {
                'class': 'input',
                'name': 'title',
                'type': 'text',
                'value': model.get('title')
            }),
            
            inputNotes = $('<input>', {
                'class': 'input',
                'name': 'notes',
                'type': 'text',
                'value': model.get('notes')
            }),
            
            inputTags = $('<input>', {
                'class': 'input',
                'name': 'tags',
                'type': 'text',
                'value': tags
            }),
            
            inputSubmit = $('<input>', {
                'class': 'button',
                'name': 'submit',
                'type': 'submit',
                'value': 'Save'
            }),
            
            cancel = $('<a>', {
                'class': 'cancel',
                'href': '#',
                'html': 'Cancel'
            });

            form.append(inputTitle);
            form.append($('<br>')); 
            form.append(inputUrl);
            form.append($('<br>')); 
            form.append(inputNotes);
            form.append($('<br>')); 
            form.append(inputTags);
            form.append($('<br>')); 
            form.append(inputSubmit);
            form.append(cancel);
            
            container.append(form);
            
            return container;
        },
        

        getFormObject: function (arr) {
            var formObj = {};
            
            arr.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;
        }        
    });
}(App.Views, App.Models));