
/*
    Dependencies
*/
var Bookmarks = require('../models/bookmarks');



function pagesFactory () {
    "use strict"; 
    
    var pages = Object.create({});
    
    
    pages.index = function (req, res) {
        if (!!(req.session.user)) {
            var options = Object.create({
                limit: 100,
                skip: req.query.skip || 0,
                tag: '',
                fields: [],
                query: {
                    owner: req.session.user._id
                }
            }); 
        
            Bookmarks.get(options, function (error,  bookmarks) {
                if (error) {
                    res.render('home', {
                        title: 'Bookmark Manager', 
                        page: 'home', 
                        loggedIn: true, 
                        bookmarks: [], 
                        user: req.session.user
                    }); 
                } 
                else {
                    res.render('home', {
                        title: 'Bookmark Manager', 
                        page: 'home', 
                        loggedIn: true, 
                        bookmarks: bookmarks, 
                        user: req.session.user
                    });                
                }
            });  
        } 
        else {    
            res.render('index', {title: 'Bookmark Manager', page: 'index', loggedIn: false});
        }
    };
    
    
    
    
    
    pages.home = function (req, res) {
        res.redirect('/');
    };
    
    
    
    
    
    pages.privacy = function (req, res) {
        res.render('privacy', {title: 'Website Terms and Conditions of Use', page: 'privacy', loggedIn: !!req.session.user});
    };
    
    
    
    
    
    pages.developers = function (req, res) {
        res.render('developers', {title: 'Developers', page: 'developers', loggedIn: !!req.session.user});
    };

    
    return pages;    
}
    

module.exports = pagesFactory();
