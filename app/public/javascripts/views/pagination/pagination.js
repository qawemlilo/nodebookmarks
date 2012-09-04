/*
    @Views - Form view with url hash history enabled
      @Register View - $default loads registration for
      @Login View - loads login form
*/
(function(views, $) {

    "use strict";
    
    views.Pagination = Backbone.View.extend({
    
        el: $('#pagination'),
        
        
        paginationTemplate: new EJS({url: '/javascripts/views/pagination/tmpl/pagination.ejs'}),
        
        
        data: {},
        
        
        events: {
            'click a.next': 'gotoNext',
            'click a.prev': 'gotoPrev'
        },
        
        
        initialize: function () {
            _.bindAll(this, 'changeCount', 'gotoNext', 'gotoPage', 'gotoPrev');
             
            this.collection.on('reset', this.render, this);
            this.collection.on('remove', function (model) {
                this.collection.removeFromOGModels(model.cid);
                this.render();
                views.Controls.render();
            }.bind(this));            
         },
         
         
        render: function () {
            this.data = this.collection.info();
            
            var html = this.paginationTemplate.render(this.data);
            
            this.$el.html(html).fadeIn();
            
            return this;
        },
         
         
        gotoPrev: function (e) {
            e.preventDefault();
            
            this.collection.previousGroup();
            this.render();
        },
         
         
        gotoNext: function (e) {
            e.preventDefault();
             
            this.collection.nextGroup();
            this.render();
        },        
         
         
        gotoPage: function (page) {
            if (page > this.collection.info().totalPages) {
                return false;
            }
            
            this.collection.goTo(page);
        },
        
        
        reset: function (page) {
            this.collection.resetFilteredModels();
        },

         
        changeCount: function (num) {
            this.collection.howManyPer(num);
            location.hash = '#pages/' + this.collection.currentPage;
        }
    });
}(App.Views, jQuery));
