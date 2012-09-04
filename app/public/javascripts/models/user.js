/*
    @Models - @User - holds user data and route url
*/
(function (models, $) {
"use strict";
    models.User = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            password:''
        },
        
        
        task: '',
        
        
        url: 'user',
        
        
        setUrl: function (url) {
            this.url = url;
        },
        
        
        validate: function (attr) {
            if (!$.validateName(attr.name) && (this.task === 'register' || this.task === 'update')) {
                $('#name').addClass('warning');
                
                return 'Name input is not valid';
            }
            if (!$.validateEmail(attr.email)) {
                var id = (this.task === 'login') ? '#login-email': '#email';
                
                $(id).addClass('warning');
                
                return 'Email input is not valid';
            }
            if (!$.validatePassword(attr.password)) {
                return 'Password input is not valid';
            }
        }
    });
}(App.Models, jQuery));
