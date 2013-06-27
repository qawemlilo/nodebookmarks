
/*
    Dependencies
*/
var request = require('request'),
    Readability = require("readabilitySAX").Readability,
    Parser = require("htmlparser2").Parser,
    Bookmarks = require('../models/bookmarks'),
    loadPage = function (url, fn) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fn(false, body);            
            }
            else {
                fn(true, '');
            }
        });
    };


    
    
function bookmarkFactory () {  
    "use strict"; 
    
    var bookmrk = Object.create({});
    
   
    bookmrk.create = function (req, res) {
        var bookmark = {}, errors;
    
        req.assert('url', 'Please enter a valid Url').isUrl();
    
        if (req.body.notes && req.body.notes.length > 2) {
            req.sanitize('notes').trim();
            req.sanitize('notes').xss();
            req.sanitize('notes').entityEncode();
        }
    
        bookmark.owner = req.session.user._id;
        bookmark.title = req.body.title || 'Untitled';
        bookmark.url = req.body.url;
        bookmark.notes = req.body.notes;
        bookmark.starred = req.body.starred;
        bookmark.publik = req.body.publik;
        bookmark.tags = req.body.tags;
        bookmark.date = req.body.date;

        errors = req.validationErrors();
    
        if (errors) {
            res.send("Please enter a valid Url", 500);
            return;
        }
    
        Bookmarks.add(bookmark,  function (error,  bookmark) {
            if (error) {
                res.send("Server error", 500); 
            } else {
                res.send({error: false, msg: 'Bookmark saved', model: bookmark});   
            }
        });
    };


    
    
    
    //Adding a new bookmark from a remote request
    bookmrk.remoteCreate = function (req, res) {
        var callback = req.query.callback, bookmark = {}, errors;

        if (!req.session.uniqueid) {
            res.send(callback + '({"error": true, "msg": "Error, user not registered"});');
            return;
        }
    
        req.assert('url', 'Please enter a valid Url').isUrl();
        
        bookmark.title = req.query.title || 'Untitled';
        bookmark.url = req.query.url;
        bookmark.owner = req.session.uniqueid;


        errors = req.validationErrors();
    
        if (errors) {
            res.send(callback + '({"error": true, "msg": "Please enter a valid Url"});');
        
        }
    
        Bookmarks.add(bookmark,  function (error,  bookmark) {
            if (error) {
                res.send(callback + '({"error": true, "msg": "Error, bookmark not saved"});');
            } else {
                res.send(callback + '({"error": false, "msg": "Bookmark saved!", "model":' + JSON.stringify(bookmark) + '});');   
            }
        });
    };




    bookmrk.remoteUpdate = function (req, res) {
        var callback = req.query.callback, 
            bookmark = {}, 
            tags = req.query.tags, 
            notes = req.query.notes;
    
        if (!req.session.uniqueid || (!req.query.tags && !req.query.notes)) {
            res.send(callback + '({"error": true, "msg": "Error, bookmark not updated"});');
            return;
        }
    
        if (req.query.notes) {
            req.sanitize('notes').trim();
            req.sanitize('notes').xss();  
            req.sanitize('notes').entityEncode();
        }
    
        if (req.query.tags) {
            req.sanitize('tags').trim();
            req.sanitize('tags').xss();
            req.sanitize('tags').entityEncode();
        }

        bookmark.tags = req.query.tags.split(',');
        bookmark.notes = req.query.notes;
        
        Bookmarks.update(req.params.id, bookmark, function (error, updatedBookmark) {
            if (error) {
                res.send(callback + '({"error": true, "msg": "Error, bookmark not updated"});');
            } else {
                res.send(callback + '({"error": false, "msg": "Bookmark updated!", "model":' + JSON.stringify(updatedBookmark) + '});');              
            }
        });
    };
    
    
    
    
    bookmrk.get = function (req, res) {
        var id = req.session.user._id, options;
    
        options = Object.create({
            limit: 100,
            skip: req.query.skip || 0,
            fields: [],
            query: {
                owner: id
            }
        });
    
        if (req.query.tag) {
            req.sanitize('tag').xss();
            req.sanitize('tag').trim();
            options.query.tags = req.query.tag;
        }
        
        Bookmarks.get(options, function (error,  bookmarks) {
            if (error) {
                res.send(500); 
            } else {
                res.send(bookmarks);  
            }
        });  
    }; 

    
    
    
    
    bookmrk.update = function (req, res) {
        var user = req.session.user,
            bookmark = {},
            errors;
    
        req.assert('url', 'Please enter a valid Url').isUrl();
    
        if (req.body.notes) {
            req.sanitize('notes').xss();
            req.sanitize('notes').trim();
            req.sanitize('notes').entityEncode();
        }
    
        bookmark.owner = user._id;
        bookmark.title = req.body.title || 'Untitled';
        bookmark.url = req.body.url;
        bookmark.notes = req.body.notes;
        bookmark.starred = req.body.starred;
        bookmark.publik = req.body.publik;
        bookmark.tags = req.body.tags;
        bookmark.date = req.body.date;

        errors = req.validationErrors();
    
        if (errors) {
            res.send("Please enter a valid Url", 500);
            return;
        }
    
        Bookmarks.update(req.params.id, bookmark, function (error, updatedBookmark) {
            if (error) {
                res.send("Server error", 500);
            } else {
                res.send({error: false, msg: 'Bookmark successfully updated'})               
            }
        });
    };
    
    
    
    

    // Deleting a bookmark
    bookmrk.remove = function (req, res) {
        Bookmarks.remove(req.params.id, function (error, updatedBookmark) {
            if (error) {
                res.send("Bookmark not deleted. Server error", 500);
            } else {
                res.send({error: false, msg: 'Bookmark successfully deleted'});                    
            }
        });
    };
    
    
    
    
    bookmrk.read = function (req, res) {
        var readable, parser;
            
        readable = new Readability({}),
        parser = new Parser(readable, {});
    
        Bookmarks.find(req.params.id, function (error, bookmark) {
            if(!error) {
                loadPage(bookmark.url, function (err, html) {
                    if (!err) {
                        parser.write(html);
                        res.render('read', {
                            page: 'read', 
                            href: bookmark.url, 
                            title: readable.getTitle(), 
                            loggedIn: !!req.session.user, 
                            articletitle: readable.getTitle(), 
                            article: readable.getHTML()
                        });
                    }
                    else {
                        res.send("Server error", 500);
                    }
                });    
            }
            else {
                res.send("Server error", 500);
            }
        });         
    };

    
    return bookmrk;
};

module.exports = bookmarkFactory();
