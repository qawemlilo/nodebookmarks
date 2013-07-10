/*

*/
define(function () {
    "use strict";
    
    var User = Backbone.Model.extend({
    
        defaults: {
            name: '',
            email: '',
            password:''
        },
        
        
        task: '',
        
        
        urlRoot: 'users',
        
        
        initialize: function (options) {
            if (options) {
                if (options.hasOwnProperty('task')) {
                    this.task = options.task;
                }
            }
        },
        
        
        setUrl: function (url) {
            this.url = url;
        },
        
        
        validate: function (attr) {
            var nameField = $('#name'),
                emailId = (this.task === 'login') ? '#login-email': '#email',
                emailField = $(emailId);
            
            if (!$.validateName(attr.name) && (this.task === 'register' || this.task === 'update')) {
                nameField.addClass('warning');
                
                return 'Name input is not valid';
                
            } else {
                if (nameField.hasClass('warning')) {
                    nameField.removeClass('warning');
                }
            }
            
            if (!$.validateEmail(attr.email)) {
                emailField.addClass('warning');
                
                return 'Email input is not valid';
                
            } else {
                if (emailField.hasClass('warning')) {
                    emailField.removeClass('warning');
                }
            }
            
            if (!$.validatePassword(attr.password)) {
                return 'Password input is not valid';
            }
        }
    });
    
    return User;
});
