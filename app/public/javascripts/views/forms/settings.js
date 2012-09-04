/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models) {
    "use strict";
    
    Views.Settings = Backbone.View.extend({
    
        el: $('#settings'),
        
        
        settingsTemplate: new EJS({url: '/javascripts/views/forms/tmpl/settings.ejs'}),
        
        
        events: {
            'submit #settings-form': 'updateUser'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'render', 'getUserData', 'updateUser', 'updateForm');
            
            this.model = new Models.User();
            this.model.task = 'update';
            this.model.on('change', this.updateForm);
 
            Models.User = this.model;
            
            return this;
        },
        
        
        render: function () {
            this.getUserData(function (data) { 
                var settingsTemplate = this.settingsTemplate.render(data);
                
                this.$el.append(settingsTemplate)
            }.bind(this));
            
            return this;
        },


        updateForm: function () {
            $('#email').attr('value', this.model.get('email'));
            $('#name').attr('value', this.model.get('name'));
        },
        
        
        updateUser: function (e) {    
            e.preventDefault();
            
            var data = this.formToObject('settings-form');  
            
            this.model.save(data, {
                success: function (model, res) {
                    if ($('#email').hasClass('warning')) {
                        $('#email').removeClass('warning');
                    }    
                    if ($('#name').hasClass('warning')) {
                        $('#name').removeClass('warning');
                    }
                    
                    $.shout(res.msg, 10);
                },
                
                error: function (model, res) {
                    $.shout(res.msg || res, 10);
                },

                wait: true                
            });
        },
        
        
        getUserData: function (fn) {
            this.model.fetch({
                success: function (model, res){
                    fn(res);
                },
                
                error: function (model, res){
                    fn({name: '', email: '', password: ''});
                }
            });
        },
        
        
        
        formToObject: function (id) {
            var formObj = {}, arr = $('#' + id).serializeArray();

            _.each(arr, function (i, fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;
        }           
    });
}(App.Views, App.Models));
