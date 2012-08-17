
/*
 * GET home page.
 */
exports.index = function (req, res, bookmarkModel) {
    if (req.session.user) {
        bookmarkModel.getAll(req.session.user._id, function (err,  bookmarks) {
            if (err) {
                res.render('home', {title: 'Home', page: 'home', loggedIn: true, bookmarks: [], user: req.session.user}); 
            } else {
                res.render('home', {title: 'Home', page: 'home', loggedIn: true, bookmarks: bookmarks, user: req.session.user});                
            }
        });             
    } else {    
      res.render('index', {title: 'Home', page: 'index', loggedIn: false});
    }
};


exports.settings = function (req, res) {
    if (req.session.user) {
        res.render('settings', {title: 'Settings', page: 'settings', loggedIn: true, user: req.session.user}); 
    } else {
        res.redirect('/');
    }
};

exports.update = function (req, res, userModel) {
    if (req.session.user) {
        var user = req.session.user;
        
        if (userModel.validString(req.body.name) &&  userModel.validEmail(req.body.email)) {
            userModel.update(user._id, {name: req.body.name, email: req.body.email, password: req.body.password}, function (err, currentuser) {
                if (err) {
                    res.send(500, {error: true, msg: 'An error occured, account info not updated'});
                } else {
                    currentuser._id = currentuser._id.toHexString();
                    req.session.user = currentuser; 
                    res.send({error: false, msg: 'Account info successfully updated'});                    
                }
            });
        }
    } else {
        res.send(500, {error: true, msg: 'You are not logged in'});
    }
};



/*
 * POST Register user.
*/
exports.register = function (req, res, userModel) {
    if (req.session.user) {
       res.send({error: true, msg: 'You are already logged'});  
    } else if (userModel.validString(req.body.name) &&  userModel.validEmail(req.body.email) &&  userModel.validString(req.body.password)) {
        userModel.register({name: req.body.name, email: req.body.email, password: req.body.password}, function (err) {
            if (err) {
                res.send(500, {error: true, msg: 'An error occured, account not created'});
            } else {
                res.send({error: false, msg: 'Thank you ' + req.body.name + ' for signing up, you may login now'});  
            }
        });  
    } else {
        res.send(500, {error: true, msg: 'Account not created, invalid input'});  
    }
};


/*
 * POST Authenticate log in
*/

exports.login = function (req, res, userModel) {
    if (req.session.user) {
    
       res.send(500, {error: true, msg: 'You are already logged in'}); 
       
    } else if (userModel.validEmail(req.body.email) || userModel.validString(req.body.password)) {
    
        userModel.login({email: req.body.email, password: req.body.password}, function (err,  user) {
            if (err) {
                res.send(500, {error: true, msg: 'Invalid email / password combination'}); 
            } else {
                user._id = user._id.toHexString();
                req.session.user = user;
                res.send({error: false, msg: 'Login successful'});  
            }
        });
        
    } else {
       res.send(500, {error: true, msg: 'Invalid input'});
    }
};


/*
 * Bookmarks
*/

exports.bookmarks = function (req, res, bookmarkModel) {
    if (!req.session.user) {
        res.send({error: false, msg: 'You are not logged in'});
        return;
    } else {
    
        bookmarkModel.getAll(req.session.user._id, function (err,  bookmarks) {
            if (err) {
                res.send(500, {error: true, msg: 'Bookmarks not found'}); 
            } else {
                res.send(bookmarks);  
            }
        });
        
    }
};

exports.addbookmark = function (req, res, bookmarkModel) {
    if (!req.session.user) {
        res.send(500, {error: true, msg: 'You are not logged in'});
        return;
    } else {
        var bookmarkObj = {};
        
        bookmarkObj.owner = req.session.user._id;
        bookmarkObj.title = req.body.title;
        bookmarkObj.url = req.body.url;
        bookmarkObj.notes = req.body.notes;
        bookmarkObj.starred = req.body.starred;
        bookmarkObj.publik = req.body.publik;
        bookmarkObj.tags = req.body.tags;
        bookmarkObj.date = req.body.date;
        
        console.log(bookmarkObj);
        
        bookmarkModel.add(bookmarkObj,  function (err,  bookmarks) {
            if (err) {
                res.send(500, {error: true, msg: 'Bookmark not saved'}); 
            } else {
               res.send({error: false, msg: 'Bookmarks saved'});   
            }
        });
        
    }
};

exports.updatebookmark = function (req, res, bookmarkModel) {
    if (req.session.user) {
        var user = req.session.user,
            bookmarkObj = {};
        
        bookmarkObj.owner = user._id;
        bookmarkObj.title = req.body.title;
        bookmarkObj.url = req.body.url;
        bookmarkObj.notes = req.body.notes;
        bookmarkObj.starred = req.body.starred;
        bookmarkObj.publik = req.body.publik;
        bookmarkObj.tags = req.body.tags;
        bookmarkObj.date = req.body.date;
        
        bookmarkModel.update(req.params.id, bookmarkObj, function (err, updatedBookmark) {
            if (err) {
                res.send(500, {error: true, msg: 'An error occured, bookmark not updated'});
            } else {
                res.send({error: false, msg: 'Bookmark successfully updated'});                    
            }
        });
    }
    else {
        res.send(500, {error: true, msg: 'An error occured, you are not logged in'});
    }
};

exports.deletebookmark = function (req, res, bookmarkModel) {
    if (req.session.user) {
        bookmarkModel.remove(req.params.id, function (err, updatedBookmark) {
            if (err) {
                res.send(500, {error: true, msg: 'An error occured, bookmark not deleted'});
            } else {
                res.send({error: false, msg: 'Bookmark successfully deleted'});                    
            }
        });
    }
    else {
        res.send(500, {error: true, msg: 'An error occured, you are not logged in'});
    }
};




