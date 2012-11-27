/*
    @Module: App.Views.Index - renders public home page
    @Dependencies - jQuery
                  - Backbone 
                  - EJS
                  - UnderScore                  
*/
(function(Backbone, views, models, routes, Template, $) {
    "use strict";
    
    views.Index = Backbone.View.extend({
    
        el: $('#form-container'),
        
        
        registerTemplate: new Template({url: '/javascripts/views/forms/tmpl/register.ejs'}),
        
        
        loginTemplate: new Template({url: '/javascripts/views/forms/tmpl/login.ejs'}),
        
        
        events: {
            'submit #register-form': 'registerUser'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'registerUser', 'render');
            
            this.router = new routes.Router();
            
            this.render();
        },
        


        /*
            @Api:     private - templates and renders forms
            @Returns: (Object) this
        */           
        render: function () {
            var loginTemplate, registerTemplate;
                
            registerTemplate = this.registerTemplate.render({});
            loginTemplate = this.loginTemplate.render({});
                
            this.$el.append(registerTemplate);
            $(loginTemplate).hide().appendTo(this.$el);
            
            return this;
        },
        


        /*
            @Api:     private - handles submitted form data on registration
            @Returns: void
            @Param:   (Object) e - submit event object
        */           
        registerUser: function (e) {    
            e.preventDefault();
            
            var newMember = new models.User(), 
                data = this.formToObject('register-form'), 
                successHandler, errorHandler;
            
            newMember.task = 'register';
            
            successHandler = function (model, res) {
                if (!res.error) {
                    $('#login-email').val(model.get('email'));
                    document.forms['register-form'].reset();
                    window.location.hash = '#user/login'; 
                    $('#bookmark-links').fadeIn();
                    
                    $.shout(res.msg, 0, 'success');
                } else { 
                    $.shout('Account not created, your form contains errors', 10, 'error');
                }
            };
                
            errorHandler = function (model, res) {
                $.shout('Account not created, your form contains errors or you are already registered', 10, 'error');
            };
            
            newMember.save(data, {success: successHandler, error: errorHandler});
        },
        
        


        /*
            @Api:     private - serializes form to hash
            @Returns: void
            @Param:   (String) id - form html id attribute
        */        
        formToObject: function (id) {
            var formObj = {}, arr = $('#' + id).serializeArray();
            
            _.each(arr, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            formObj.title = encodeURIComponent(formObj.title);
            formObj.url = encodeURIComponent(formObj.url);
            formObj.notes = encodeURIComponent(formObj.notes);
            formObj.tags = encodeURIComponent(formObj.tags);
            
            return formObj;
        }         
    });
}(Backbone, App.Views, App.Models, App.Routes, EJS, jQuery));
