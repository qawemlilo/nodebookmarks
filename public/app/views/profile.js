/*


*/
define(['../models/user', 'text!templates/profile.html'], function(User, settingsTemplate) {
    "use strict";
    
    var Profile = Backbone.View.extend({
    
        el: $('#content-body'),
        
        
        
        settingsTemplate: _.template(settingsTemplate),
        
        
        
        
        events: {
            'submit #settings-form': 'update',
            'submit #delete': 'promptUser'
        }, 
        
        
      
      
        initialize: function (opts) {
            _.bindAll(this, 'render', 'update', 'promptUser');
            
            this.app = opts.app;
            
            if (this.app.page === 'demo') {
                return this;
            }
            
            this.model = new User(opts.user);
            this.model.task = 'update';
            this.model.on('change', this.render);
            
            return this;
        },
        
        
        

        /*
            @Api:     public - loads template and renders profile form 
            @Returns: void
        */
        render: function () {
            if (this.app.page === 'demo') {
                return this;
            }
            
            var template = this.settingsTemplate(this.model.toJSON());
            
            this.$el.html(template);
            
            return this;
        },

        
        
        
        promptUser: function (e) {
            return confirm('Are you sure you want to delete your account?');
        },  
        
        


        /*
            @Api:     private - updates user model and posts to the server
            @Returns: void
            @Param:   (Object) e - submit event object           
        */        
        update: function (e) {    
            e.preventDefault();
            
            var data = this.formToObject('settings-form'), successHandler, errorHandler; 
            
            successHandler = function (model, res) {
                $.shout(res.msg, 5, 'success');
            };
            
            errorHandler = function (model, res) {
                $.shout(res.msg || res, 5, 'error');
            };
            
            this.model.save(data, {success: successHandler, error: errorHandler, wait: true});
        },
        
        


        /*
            @Api:     private - serializes form to hash
            @Returns: void
            @Param:   (String) id - form html id attribute
        */         
        formToObject: function (id) {
            var i, formObj = {}, arr = $('#' + id).serializeArray();

            for (i = 0; i < arr.length; i++) {
                if (arr[i].name !== 'submit') {
                    formObj[arr[i].name] = arr[i].value;
                }
            }
            
            return formObj;
        }           
    });
    
    return Profile;
});
