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
            $('#home').css('display', 'none');
            $('#settings').css('display', 'block');  
        },
        
        loadHome: function () {
            $('#settings').css('display', 'none');
            $('#home').css('display', 'block');
        }
    });
}(App.Routes));