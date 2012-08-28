/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(Views, Models, $) {
"use strict";
    Views.Pagination = Backbone.View.extend({
    
        el: $('#pagination'),
        
        paginationTemplate: new EJS({url: '/javascripts/views/pagination/tmpl/pagination.ejs'}),
        
        
        data: {},
        
        
        events: {
            'click a.next': 'gotoNext',
            'click a.previ': 'gotoPrev',
            'click a.first': 'gotoFirst',
            'click a.last': 'gotoLast'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'gotoFirst', 'gotoLast', 'changeCount', 'gotoNext', 'gotoPage', 'gotoPrev');
             
            this.collection.on('reset', this.render, this);
            
            this.data = this.collection.info();
         },
         
         
        render: function () {
           var html = this.paginationTemplate.render(this.data);
           this.$el.html(html);
            
           return this;
        },
         
         
         
        reRender: function () {
           this.data = this.collection.info();
           this.render();
           return this;
        },
         
         
        gotoFirst: function () {
            this.collection.goTo(1);
            this.reRender();
        },
         
         
        gotoPrev: function (e) {
            e.preventDefault();
            
            this.collection.previousGroup();
            this.reRender();
        },
         
         
        gotoNext: function (e) {
            e.preventDefault();
             
            this.collection.nextGroup();
            this.reRender();
        },
         
         
        gotoLast: function () {
            this.collection.goTo(this.collection.information.lastPage);
            this.reRender();
        },        
         
         
        gotoPage: function (page) {
            this.collection.goTo(page);
            this.reRender();
        },

         
        changeCount: function (num) {
            this.collection.howManyPer(num);
            this.reRender();
        }
    });
}(App.Views, App.Models, jQuery));
