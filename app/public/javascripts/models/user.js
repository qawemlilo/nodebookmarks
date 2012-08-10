/*
    @Models - @User - holds user data and route url
*/
(function(Models) {
"use strict";
    Models.User = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            password:''
        },
        
        url: 'register',
        
        setUrl: function (url) {
            this.url = url;
        }
    });
}(App.Models));