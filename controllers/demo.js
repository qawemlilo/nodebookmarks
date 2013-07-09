
/*
    Dependencies
*/
var Bookmarks = require('../models/bookmarks');




function demoFactory () {  
    "use strict"; 
    
    var demo = Object.create({});

    
    demo.create = function (req, res) {
        var options = Object.create({
           limit: 100,
            
            skip: req.query.skip || 0,
            
            tag: '',
            
            fields: [],
            
            query: {
                publik: true
            }
        }); 
        
        Bookmarks.get(options, function (error,  bookmarks) {
            if (error) {
                res.render('demo', {
                    title: 'Bookmark Manager - Demo', 
                    page: 'demo', 
                    loggedIn: !!req.session.user, 
                    bookmarks: [], 
                    user: req.session.user
                }); 
            } 
            else {
                res.render('demo', {
                    title: 'Bookmark Manager - Demo', 
                    page: 'demo', 
                    loggedIn: !!req.session.user, 
                    bookmarks: bookmarks, 
                    user: req.session.user
                });                
            }
        });
    };
    

    
    return demo;
};

module.exports = demoFactory();
