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
        
        
        urlRoot: 'user',
        
        
        setUrl: function (url) {
            this.url = url;
        },
        
        
        validate: function (attr) {
            if (!$.validateName(attr.name) && (this.task === 'register' || this.task === 'update')) {
                $('#name').addClass('warning');
                
                return 'Name input is not valid';
            }
            
            if (!attr.email) {
                var id = (this.task === 'login') ? '#login-email': '#email';
                
                $(id).addClass('warning');
                
                return 'Email input is not valid';
            }
            
            if (!$.validatePassword(attr.password)) {
                return 'Password input is not valid';
            }
        },
        
        
        update: function (data, options) {
            var changedAttributes = {}, model = this, attr, update = false;
            
            for (attr in data) {
                if (data[attr] !== model.get(attr)) {
                    changedAttributes[attr] = data[attr];
                    update = true;
                }
            }
            
            if (update) {
               model.save(changedAttributes, options);
            }
            else {
                $.shout('Nothing to update', 10, 'success');
            }
        }
    });
    
    return User;
});
