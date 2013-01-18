/*

*/
define(['text!templates/home/home.html'], function (homeTemplate) {
    "use strict";
    
    var Home = Backbone.View.extend({

        el: $('#content-body'),

        
        homeTemplate: _.template(homeTemplate),
        
        
        
        
        /*
            @Constructor - initializes app views 
        */
        initialize: function (opts) {
            var self = this;
            
            _.bindAll(self, 'render', 'assign');
            
            self.app = opts.app;
            
            return self;
        },
        
        
        
        
        render: function () {
            var template = this.homeTemplate({}), self = this;
            
            self.$el.html(template);
            
            self.assign({
                '#controls': self.app.views.controls, 
                '#bookmarks-table': self.app.views.bookmarks,
                '#pagination': self.app.views.pagination
            });
            
            self.app.views.bookmarks.collection.pager();
        },
        
        
        
        
        assign: function (selector, view) {
            var selectors;
            
            if (_.isObject(selector)) {
                selectors = selector;
            }
            else {
                selectors = {};
                selectors[selector] = view;
            }
            
            if (!selectors) {
                return;
            }
            
            _.each(selectors, function (view, selector) {
                view.setElement(this.$(selector)).render();
            }, this);
        }        
    });
    
    return Home;
});
