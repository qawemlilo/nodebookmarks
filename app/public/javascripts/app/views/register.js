/*
    Registration form view                  
*/
define(['../models/user', 'text!templates/register/register.html'], function(User, registerTemplate) {
    "use strict";
    
    var Register = Backbone.View.extend({
    
        el: $('#content-body'),
        
        
        events: {
            'submit #register-form': 'registerUser'
        },
        
        
        
        registerTemplate: _.template(registerTemplate),
        
        
        
        
        initialize: function (obj) {
            this.app = obj.app;
            
            _.bindAll(this, 'registerUser', 'render');

            return this;
        },
        


        /*
            Renders form
        */           
        render: function () {
            var self =this, template = self.registerTemplate({});
            
            self.$el.html(template);
            
            return self;
        },
        


        /*
            Handles submitted form data on registration
            @Param:   (Object) e - submit event object
        */           
        registerUser: function (e) {    
            e.preventDefault();
            
            var newMember = new User(),
                self = this,            
                data = self.formToObject('register-form'), 
                successHandler, errorHandler;
            
            newMember.task = 'register';
            
            successHandler = function (model, res) {
                if (!res.error) {
                    self.$('#login-email').val(model.get('email'));
                    document.forms['register-form'].reset();
                    window.location.hash = '#users/login/new'; 
                    $.shout(res.msg, 15, 'success');
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
            Serializes form to hash
            @Param:   (String) id - form html id attribute
        */        
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
    
    return Register;
});
