/*
    @Routes - @AppRouter - handles and responds to changes in url hash
    #login - calls loadLogin() method which loads login form
    #register - calls loadRegister() method which loads registration form
*/
(function(Routes) {
"use strict";
    Routes.AppRouter = Backbone.Router.extend({
        routes: {
            'settings': 'loadSettings',
            'bookmarks': 'loadHome',
            '': 'loadHome'
        },
        
        loadSettings: function () {
            $('#home').fadeOut(function () {
                $('#settings').fadeIn(); 
            }); 
        },
        
        loadHome: function () {
            $('#settings').fadeOut(function () {
                $('#home').fadeIn();
            });
        }
    });
}(App.Routes));