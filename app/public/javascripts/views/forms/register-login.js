/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, models, routes) {
"use strict";
    views.Index = Backbone.View.extend({
    
        el: $('#form-container'),
        
        
        registerTemplate: new EJS({url: '/javascripts/views/forms/tmpl/register.ejs'}),
        
        
        loginTemplate: new EJS({url: '/javascripts/views/forms/tmpl/login.ejs'}),
        
        
        events: {
            'submit #register-form': 'registerUser',
            
            'submit #login-form': 'loginUser'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'registerUser', 'loginUser');
            
            this.router = new routes.Router();
            
            this.render();
        },
        
        
        render: function () {
            var loginTemplate, registerTemplate;
                
            registerTemplate = this.registerTemplate.render({});
            loginTemplate = this.loginTemplate.render({});
                
            $(this.el).append(registerTemplate);
            $(loginTemplate).hide().appendTo(this.el);
            
            return this;
        },
        
        
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
                    
                    $('#register-form').fadeOut(function () {
                        window.location.hash = 'login'; 
                        $('#login-form').fadeIn('slow');
                    });
                    
                    $.shout(res.msg, 10);
                } else { 
                    $.shout('Account not created, your form contains errors', 10);
                }
            };
                
            errorHandler = function (model, res) {
                $.shout(res.msg || res, 10);
            };
            
            newMember.save(data, {success: successHandler, error: errorHandler});
        },
        
        
        
        loginUser: function (e) {    
            e.preventDefault();
            
            var user = new models.User(), 
                data = this.formToObject('login-form'), 
                successHandler, errorHandler;
            
            user.task = 'login';            
            user.setUrl('login');

            successHandler = function (model, res) {
                if (!res.error) {
                    window.location.href = 'http://localhost:3000'; 
                } else { 
                    $('#login-email').addClass('warning');
                    $('#login-password').addClass('warning');
                        
                    $.shout(res.msg, 10);
                }
            };
                
            errorHandler = function (model, res) {
                $.shout(res.msg || res, 10);
            };
            
            user.save(data, {success: successHandler, error: errorHandler});
        },
        
        
        
        formToObject: function (id) {
            var formObj = {}, arr = $('#' + id).serializeArray();
            
            _.each(arr, function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;
        }         
    });
}(App.Views, App.Models, App.Routes));
