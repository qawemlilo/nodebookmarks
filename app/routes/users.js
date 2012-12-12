
var mailer = require('../models/mailer');


/*
 * GET home page.
 */
exports.index = function (req, res, model) {
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
        
        model.get(options, function (error,  bookmarks) {
            if (error) {
                res.render('home', {title: 'Bookmark Manager', page: 'home', loggedIn: true, bookmarks: [], user: req.session.user}); 
            } else {
                res.render('home', {title: 'Bookmark Manager', page: 'home', loggedIn: true, bookmarks: bookmarks, user: req.session.user});                
            }
        });             
    } else {    
      res.render('index', {title: 'Bookmark Manager', page: 'index', loggedIn: false});
    }
};







// Fetching demo bookmarks
exports.demo = function (req, res, model) {
    var options = Object.create({
        limit: 100,
            
        skip: req.query.skip || 0,
            
        tag: '',
            
        fields: [],
            
        query: {
            owner: "5024b9236f760ecc03000001"
        }
    }); 
        
    model.get(options, function (error,  bookmarks) {
        if (error) {
            res.render('demo', {title: 'Bookmark Manager - Demo', page: 'demo', loggedIn: !!req.session.user, bookmarks: [], user: req.session.user}); 
        } else {
            res.render('demo', {title: 'Bookmark Manager - Demo', page: 'demo', loggedIn: !!req.session.user, bookmarks: bookmarks, user: req.session.user});                
        }
    });
};









// Update user information
exports.update = function (req, res, model) {
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
    
    model.update(req.params.id, {name: req.body.name, email: req.body.email, password: req.body.password}, function (error, currentuser) {
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

exports.remove = function (req, res, model) {
    model.remove(req.session.user._id, function (error) {
        if (error) {
            res.send(500);
        } else {
            res.redirect('/user/logout');                   
        }
    });
};











/*
 * POST Register user.
*/

exports.register = function (req, res, model) {
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
    
    model.register({name: req.body.name, email: req.body.email, password: req.body.password}, function (error, user) {
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
            mailer(user.email, "Welcome to Bookmark Manager", msg, function (error) {
                if (error) {
                    console.log('Email not sent');   
                }    
            });
            
            res.send({error: false, msg: 'Thank you ' + user.name + ' for registering. You may login after saving your buttons.', id: user._id.toHexString()});  
        }
    });        
};










/*
 * POST Authenticate log in
*/

exports.login = function (req, res, model) {
    var errors;
    
    req.assert('email', 'Please enter a valid Url').isEmail();
    
    errors = req.validationErrors();
    
    if (errors) {
        res.send("Please enter a valid Email", 500);
        return;
    }
    
    model.login({email: req.body.email, password: req.body.password}, function (error,  user) {
        if (error) {
            res.redirect('/#user/login/error'); 
        } else {
            user._id = user._id.toHexString();
            req.session.user = user;
            req.session.uniqueid = user._id;
            res.redirect('/');  
        }
    });
       
};

