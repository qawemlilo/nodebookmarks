/*


*/
define(['../models/user', 'text!templates/profile.html'], function(User, settingsTemplate) {
    "use strict";
    
    var Profile = Backbone.View.extend({
    
        el: $('#content-body'),
        
        
        
        settingsTemplate: _.template(settingsTemplate),
        
        
        
        
        
        events: {
            'submit #settings-form': 'updateUser',
            'submit #delete': 'promptUser'
        },
        
        
        
        
        
        
        
        
      
        initialize: function (opts) {
            _.bindAll(this, 'render', 'getUserData', 'updateUser', 'updateForm', 'promptUser');
            
            this.app = opts.app;
            
            if (this.app.page === 'demo') {
                return;
            }
            
            this.model = new User();
            this.model.task = 'update';
            this.model.on('change', this.updateForm);
            
            return this;
        },
        
        
        
        
        
        
        
        

        /*
            @Api:     public - loads template and renders profile form 
            @Returns: void
        */
        render: function () {
            if (this.app.page === 'demo') {
                return;
            }
            
            this.getUserData(function (data) { 
                var template = this.settingsTemplate(data);
                this.app.user = data;
                this.$el.html(template);
            }.bind(this));
            
            return this;
        },
        
        
        
        
        
        


        /*
            @Api:     private - updates profile form
            @Returns: void
        */
        updateForm: function () {
            $('#email').attr('value', this.model.get('email'));
            $('#name').attr('value', this.model.get('name'));
        },
        
        
        promptUser: function (e) {
            return confirm('Are you sure you want to delete your account?');
        },
        
        
        
        
        
        


        /*
            @Api:     private - updates user model and posts to the server
            @Returns: void
            @Param:   (Object) e - submit event object           
        */        
        updateUser: function (e) {    
            e.preventDefault();
            
            var data = this.formToObject('settings-form'), successHandler, errorHandler; 
            
            successHandler = function (model, res) {
                if ($('#email').hasClass('warning')) {
                    $('#email').removeClass('warning');
                }
                if ($('#name').hasClass('warning')) {
                    $('#name').removeClass('warning');
                }
                
                $.shout(res.msg, 10, 'success');
            };
            
            errorHandler = function (model, res) {
                $.shout(res.msg || res, 10, 'error');
            };
            
            this.model.save(data, {success: successHandler, error: errorHandler, wait: true});
        },
        
        
        
        
        


        /*
            @Api:     private - fetches user data from the server
            @Returns: void
            @Param:   (Function) next - function called after fetch request is complete
        */        
        getUserData: function (next) {
            if (this.app.hasOwnProperty('user')) {
                next(this.app.user);
                return;
            }
            this.model.fetch({
                success: function (model, res) {
                    next(res);
                },
                
                error: function (model, res){
                    next({name: '', email: '', password: ''});
                }
            });
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
