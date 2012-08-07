/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models) {
"use strict";
    Views.Form = Backbone.View.extend({
    
        el: $('#form-container'),
        
        
        errors: 0,
        
        
        events: {
            'submit #register-form': 'registerUser',
            
            'blur #name': 'validateName',
            
            'blur #email': 'validateEmail',
            
            'blur #password': 'validatePassword'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'registerUser', 'validateName', 'validateEmail', 'validatePassword', 'shout');
        },
        
        
        /*
            @Details - Event handler for registartion form submition
            @Event - submit
        */
        registerUser: function (e) {    
            e.preventDefault();
            
            var newMember, data, $this = this;
            
            if ($this.errors > 0) {
                $this.shout('Please correct all fields marked with a red border', 10);
                return;
            }
                
            data = $this.getFormObject(['name', 'email', 'password']); 
                        
            newMember = new Models.User();
            
            newMember.save(data, {
                success: function (model, res) {
                
                    $('#login-email').val(model.get('email'));
                    document.forms['register-form'].reset();
                    
                    $('#register-form').fadeOut(function () {
                        window.location.hash = 'login'; 
                        $('#login-form').fadeIn('slow');
                    });
                    
                    $this.shout(res.msg);
                },
                error: function () {
                    console.log('err')
                }                
            });
        },
        
        
        
        /*
            @Details - Creates a key-value object from a form.
            @Params -  Array @fields : ids of associative fields
        */
        getFormObject: function (fields) {
            var obj = {};
            
            $.each(fields, function (i, id) {
                obj[id] = $('#' + id).val();
            });
            
            return obj;
        },
        
        
        /*
            @Details - Validates name field
            @Event -  blur
        */
        validateName: function () {
            var name = $('#name').val();
            
            if (name.length < 3) {
            
                this.errors += 1;
                $('#name').addClass('warning');
                
            } else if ($('#name').hasClass('warning')) {
            
                this.errors -= 1;
                $('#name').removeClass('warning');
                
            }
        },
        

        /*
            @Details - Validates email field
            @Event -  blur
        */
        validateEmail: function () {    
            var email = $('#email').val();
            
            if (email.length < 3) {
            
                this.errors += 1;
                $('#email').addClass('warning');
                
            } else if ($('#email').hasClass('warning')) {
            
                this.errors -= 1;
                $('#email').removeClass('warning');
                
            }
        },

        
        /*
            @Details - Validates password field
            @Event -  blur
        */
        validatePassword: function () {    
            var password = $('#password').val();
            
            if (password.length < 6) {
            
                this.errors += 1;
                $('#password').addClass('warning');  
                
            } else if ($('#password').hasClass('warning')) {
            
                this.errors -= 1;
                $('#password').removeClass('warning');
                
            }
        }, 
        
        
        /*
            @Details - Displays notifications to the user
            @Params -  String msg - text to be displayed
                       Number x - seconds before msg is cleared, default max
        */
        shout: function (msg, x) { 
		    if ($("#appMessage")) {
			    $("#appMessage").fadeOut(function(){
				    $("#appMessage").remove();
			    });
		    }
		
		    var elem = $('<div>', {'id': 'appMessage', html: msg});
		
		    elem.click(function () {
			    $(this).fadeOut(function(){
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
}(App.Views, App.Models));