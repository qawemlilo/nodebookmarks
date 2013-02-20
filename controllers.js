
/*
    Dependencies
*/
var request = require('request'),
    Readability = require("readabilitySAX").Readability,
    Parser = require("htmlparser2").Parser;




function controllers (params) {  
  
    var Bookmarks = params.Bookmarks,     
        Users = params.Users,
        Mailer = params.Mailer,
        loadPage;
        
        
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
    
    
    
    
    
    controllers.index = function (req, res) {
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
                    res.render('home', {title: 'Bookmark Manager', page: 'home', loggedIn: true, bookmarks: [], user: req.session.user}); 
                } 
                else {
                    res.render('home', {title: 'Bookmark Manager', page: 'home', loggedIn: true, bookmarks: bookmarks, user: req.session.user});                
                }
            });  
        } 
        else {    
            res.render('index', {title: 'Bookmark Manager', page: 'index', loggedIn: false});
        }
    };
    
    
    
    
    
    controllers.home = function (req, res) {
        res.redirect('/');
    };
    
    
    
    
    
    controllers.privacy = function (req, res) {
        res.render('privacy', {title: 'Website Terms and Conditions of Use', page: 'privacy', loggedIn: !!req.session.user});
    };
    
    
    
    
    
    controllers.developers = function (req, res) {
        res.render('developers', {title: 'Developers', page: 'developers', loggedIn: !!req.session.user});
    }; 
    
    
    
    
    
    
    controllers.registerUser = function (req, res) {
        var errors;
    
        req.assert('email', 'Please enter a valid Url').isEmail();
        req.assert('name', 'Please enter a valid Url').len(3, 60);
    
        if (req.query.name && req.query.name.length > 2) {
            req.sanitize('name').xss();
            req.sanitize('name').trim();
            req.sanitize('name').entityEncode();
        }
    
        errors = req.validationErrors();
    
        if (errors) {
            res.send("Please enter a valid Email", 500);
            return;
        }
    
        Users.register({name: req.body.name, email: req.body.email, password: req.body.password}, function (error, user) {
            var msg = 'Hi ' + user.name + '<br><br>';
        
            msg += 'Your account was successfully created, thank you for registering. In order to activate your account please login using the credentials below: <br><br>';
            msg += '<strong>Email:</strong> ' + user.email + '<br>';
            msg += '<strong>Password:</strong> ' + req.body.password + '<br><br>';
            msg += '<i>Please reply to this email for any questions or feeback.</i><br><br><br>';
            msg += '<strong>Bookmark Manager</strong><br>';
            msg += '<i>An easy way to save and manage your browser bookmarks<i> <br>';
            msg += '<a href="http://www.bookmarkmanager.co.za">http://www.bookmarkmanager.co.za</a><br>';
        
            if (error) {
                res.send("Server error, user not registerd", 500);
            } else {
                Mailer(user.email, "Welcome to Bookmark Manager", msg, function (error) {
                    if (error) {
                        console.log('Email not sent');   
                    }    
                });
            
                res.send({error: false, msg: 'Thank you ' + user.name + ' for registering. You may login after saving your buttons.', id: user._id.toHexString()});  
            }
        });        
    };
    
    
    
    
    
    controllers.getUser = function (req, res) {
        var user = req.session.user;
    
        res.send({
            id: user._id, 
            password: '', 
            name: user.name, 
            email: user.email
        });
    };
    
    
    
    
    
    // Update user information
    controllers.updateUserInfo = function (req, res) {
        var errors;
    
        req.assert('email', 'Please enter a valid Url').isEmail();
        req.assert('name', 'Please enter a valid Url').len(3, 60);
    
        if (req.query.name && req.query.name.length > 2) {
            req.sanitize('name').xss();
            req.sanitize('name').trim();
            req.sanitize('name').entityEncode();
        }
    
        errors = req.validationErrors();
    
        if (errors) {
            res.send("Please enter a valid Email", 500);
            return;
        }
    
        Users.update(req.params.id, {name: req.body.name, email: req.body.email, password: req.body.password}, function (error, currentuser) {
            if (error) {
                res.send("Server error", 500);
            } else {
                currentuser._id = currentuser._id.toHexString();
                req.session.user = currentuser;
                res.send({error: false, msg: 'Account info successfully updated'});                   
            }
        });
    };
    
    
    
    
    
    // delete user
    controllers.removeUser = function (req, res) {
        Users.remove(req.session.user._id, function (error) {
            if (error) {
                res.send(500);
            } else {
                res.redirect('/user/logout');                   
            }
        });
    };
    
    
    
    
    
    controllers.login = function (req, res) {
        var errors;
        
        req.assert('email', 'Please enter a valid Url').isEmail();
        errors = req.validationErrors();
        
        if (errors) {
            res.send("Please enter a valid Email", 500);
            return;
        }
    
        Users.login({email: req.body.email, password: req.body.password}, function (error,  user) {
            if (error) {
                res.redirect('/#user/login/error'); 
            } 
            else {
                user._id = user._id.toHexString();
                req.session.user = user;
                req.session.uniqueid = user._id;
                res.redirect('/');  
            }
        });
    };
    
    
    
    
    
    controllers.logout = function (req, res) {
        if (req.session.user) {
            delete req.session.user;
        }
        
        res.redirect('/');
    };



    
    
    /*
    
    */
    
    
    //Adding a new bookmark
    controllers.addBookmark = function (req, res) {
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
    controllers.addBookmarkRemotely = function (req, res) {
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





    //Updating a bookmark info
    controllers.updateBookmarkRemotely = function (req, res) {
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
    
    
    
    

    
    // Fetching all bookmarks
    controllers.getBookmarks = function (req, res) {
        var id = "5024b9236f760ecc03000001", options;
    
        if (req.session.user) {
            id = req.session.user._id;
        }
    
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
    

    
    
    
    //Updating a bookmark info
    controllers.updateBookmark = function (req, res) {
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
    controllers.removeBookmark = function (req, res) {
        Bookmarks.remove(req.params.id, function (error, updatedBookmark) {
            if (error) {
                res.send("Bookmark not deleted. Server error", 500);
            } else {
                res.send({error: false, msg: 'Bookmark successfully deleted'});                    
            }
        });
    };
    
    
    
    controllers.readBookmark = function (req, res) {
        var readable, parser;
            
        readable = new Readability({}),
        parser = new Parser(readable, {});
    
        Bookmarks.find(req.params.id, function (error, bookmark) {
            if(!error) {
                loadPage(bookmark.url, function (err, html) {
                    if (!err) {
                        parser.write(html);
                        res.render('read', {page: 'read', href: bookmark.url, title: readable.getTitle(), loggedIn: !!req.session.user, articletitle: readable.getTitle(), article: readable.getHTML()});
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







    // Fetching demo bookmarks
    controllers.demo = function (req, res) {
        var options = Object.create({
           limit: 100,
            
            skip: req.query.skip || 0,
            
            tag: '',
            
            fields: [],
            
            query: {
                owner: "5024b9236f760ecc03000001"
            }
        }); 
        
        Bookmarks.get(options, function (error,  bookmarks) {
            if (error) {
                res.render('demo', {title: 'Bookmark Manager - Demo', page: 'demo', loggedIn: !!req.session.user, bookmarks: [], user: req.session.user}); 
            } 
            else {
                res.render('demo', {title: 'Bookmark Manager - Demo', page: 'demo', loggedIn: !!req.session.user, bookmarks: bookmarks, user: req.session.user});                
            }
        });
    };
    

    
    return controllers;
};

module.exports = controllers;
