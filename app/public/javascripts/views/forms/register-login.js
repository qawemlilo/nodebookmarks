/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, Routes) {
"use strict";
    Views.Form = Backbone.View.extend({
    
        el: $('#form-container'),
        
        
        loginErrors: 0,
        
        
        registerErrors: 0,
        
        
        registerTemplate: new EJS({url: '/javascripts/views/forms/tmpl/register.ejs'}),
        
        
        loginTemplate: new EJS({url: '/javascripts/views/forms/tmpl/login.ejs'}),
        
        
        events: {
            'submit #register-form': 'registerUser',
            
            'submit #login-form': 'loginUser',
            
            'blur #name': 'validateName',
            
            'blur #email': 'validateRegisterEmail',
            
            'blur #login-email': 'validateLoginEmail',
            
            'blur #password': 'validatePassword',
            
            'blur #login-password': 'validateLoginPassword'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'registerUser', 'loginUser', 'validateName', 'validateRegisterEmail', 'validateLoginEmail', 'validatePassword', 'shout');
            
            this.router = new Routes.Router();
            
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
        
        
        
        /*
            @Details - Event handler for registartion form submition
            @Event - submit
        */
        registerUser: function (e) {    
            e.preventDefault();
            
            var newMember, data, $this = this;
            
            if ($this.registerErrors > 0) {
                $this.shout('Please correct all fields marked with a red border', 10);
                return;
            }
                
            data = $this.getFormObject('register-form'); 
         
            newMember = new Models.User();
            
            newMember.save(data, {
                success: function (model, res) {
                    if (!res.error) {
                        $('#login-email').val(model.get('email'));
                        document.forms['register-form'].reset();
                    
                        $('#register-form').fadeOut(function () {
                            window.location.hash = 'login'; 
                            $('#login-form').fadeIn('slow');
                        });
                    
                        $this.shout(res.msg);
                    } else {
                        $this.shout('Account not created, your form contains errors');
                    }
                },
                error: function () {
                    $this.shout('Account not created, your form contains errors');
                }                
            });
        },
        
        
        
        loginUser: function (e) {    
            e.preventDefault();
            
            var newMember, data, $this = this;
            
            if ($this.loginErrors > 0) {
                $this.shout('Please correct all fields marked with a red border', 10);
                return;
            }
                
            data = $this.getFormObject('login-form');
                        
            newMember = new Models.User();
            newMember.setUrl('login');
            
            newMember.save(data, {
                success: function (model, res) {
                    if (!res.error) {
                        window.location.href = 'http://localhost:3000'; 
                    } else {
                        $this.shout(res.msg);
                        $('#login-email').addClass('warning');
                        $('#login-password').addClass('warning');
                    }
                },
                
                error: function () {
                    $this.shout('Login error');
                }                
            });
        },
        
        
        
        /*
            @Details - Creates a key-value object from a form.
            @Params -  Array @fields : ids of associative fields
        */
        getFormObject: function (id) {
            var formObj = {}, arr = $('#' + id).serializeArray();
            
            arr.forEach(function (fieldObj) {
                if (fieldObj.name !== 'submit') {
                    formObj[fieldObj.name] = fieldObj.value;
                }
            });
            
            return formObj;
        },
        
        

        /*
            @Details - Validates email field
            @Event -  blur
        */
        validateEmail: function (email) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            
            return pattern.test(email);
        },
        
        
        
        validateLoginEmail: function () { 
            var emailField = $('#login-email'),
                emailValue = emailField.val();
            
            if (!this.validateEmail(emailValue) && !emailField.hasClass('warning')) {
            
                this.loginErrors += 1;
                emailField.addClass('warning');
                
            } else if (this.validateEmail(emailValue) && emailField.hasClass('warning')) {
            
                this.loginErrors -= 1;
                emailField.removeClass('warning');
                
            }
        },
        
        
        /*
            @Details - Validates password field
            @Event -  blur
        */
        validateName: function () {    
            var nameField = $('#name'),
                nameValue = nameField.val();
            
            if ((!nameValue || nameValue.length < 3) && !nameField.hasClass('warning')) {
            
                this.registerErrors += 1;
                nameField.addClass('warning');  
                
            } else if (nameValue && nameValue.length >= 3 && nameField.hasClass('warning')) {
            
                this.registerErrors -= 1;
                nameField.removeClass('warning');
                
            }
        },
        
        
        
        validateRegisterEmail: function () {    
            var emailField = $('#email'),
                emailValue = emailField.val();
            
            if (!this.validateEmail(emailValue) && !emailField.hasClass('warning')) {
            
                this.registerErrors += 1;
                emailField.addClass('warning');
                
            } else if (this.validateEmail(emailValue) && emailField.hasClass('warning')) {
            
                this.registerErrors -= 1;
                emailField.removeClass('warning');
                
            }
        },

        
        
        /*
            @Details - Validates password field
            @Event -  blur
        */
        validatePassword: function () {    
            var passwordField = $('#password'),
                passwordValue = passwordField.val();
            
            if ((!passwordValue || passwordValue.length < 6) && passwordField.hasClass('warning')) {
            
                this.registerErrors += 1;
                passwordField.addClass('warning');  
                
            } else if (passwordValue && passwordValue.length >= 6 && passwordField.hasClass('warning')) {
            
                this.registerErrors -= 1;
                passwordField.removeClass('warning');
                
            }
        },


        /*
            @Details - Validates password field
            @Event -  blur
        */
        validateLoginPassword: function () {    
            var passwordField = $('#login-password'),
                passwordValue = passwordField.val();
            
            if ((!passwordValue || passwordValue.length < 6) && passwordField.hasClass('warning')) {
            
                this.loginErrors += 1;
                passwordField.addClass('warning');  
                
            } else if (passwordValue && passwordValue.length >= 6 && passwordField.hasClass('warning')) {
            
                this.loginErrors -= 1;
                passwordField.removeClass('warning');
                
            }
        },        
        
        
        
        
        /*
            @Details - Displays notifications to the user
            @Params -  String msg - text to be displayed
                       Number x - seconds before msg is cleared, default max
        */
        shout: function (msg, x) {
            if ($("#appMessage")) {
                $("#appMessage").fadeOut(function () {
                    $("#appMessage").remove();
                });
            }
            
            var elem = $('<div>', {'id': 'appMessage', html: msg});
            
            elem.click(function () {
                $(this).fadeOut(function () {
                    $(this).remove();
                });
            });
            
            if (x) {
                setTimeout(function () {
                    elem.click();
                }, x * 1000);
            }
            
            elem.hide().appendTo('body').slideDown();
        }            
    });
}(App.Views, App.Models, App.Routes));
