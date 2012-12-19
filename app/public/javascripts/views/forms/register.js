/*
    Registration form view                  
*/
(function(Backbone, views, models, routes, Template, $) {
    "use strict";
    
    views.Index = Backbone.View.extend({
    
        el: $('#form-container'),
        
        
        events: {
            'submit #register-form': 'registerUser'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'registerUser', 'render');
            
            this.router = new routes.Router();
            
            this.render();
        },
        


        /*
            Renders form
        */           
        render: function () {
            return this;
        },
        


        /*
            Handles submitted form data on registration
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
}(Backbone, App.Views, App.Models, App.Routes, EJS, jQuery));
