
/*
    Dependencies
*/
var Users = require('../models/users');




function userFactory () {  
    "use strict"; 
    
    var user = Object.create({});

    
    user.register = function (req, res) {
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
            
                res.send({
                    error: false, 
                    msg: 'Thank you ' + user.name + ' for registering. You may login after saving your buttons.', 
                    id: user._id.toHexString()
                });  
            }
        });        
    };
    
    
    
    
    
    user.get = function (req, res) {
        var user = req.session.user;
    
        res.send({
            id: user._id, 
            password: '', 
            name: user.name, 
            email: user.email
        });
    };
    
    
    
    
    
    // Update user information
    user.update = function (req, res) {
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
    user.remove = function (req, res) {
        Users.remove(req.session.user._id, function (error) {
            if (error) {
                res.send(500);
            } else {
                res.redirect('/user/logout');                   
            }
        });
    };
    
    
    
    
    
    user.login = function (req, res) {
        var errors;
        
        req.assert('email', 'Please enter a valid Url').isEmail();
        errors = req.validationErrors();
        
        if (errors) {
            res.send("Please enter a valid Email", 500);
            return;
        }
    
        Users.login({email: req.body.email, password: req.body.password}, function (error,  user) {
            if (error) {
                res.redirect('/#users/login/error'); 
            } 
            else {
                user._id = user._id.toHexString();
                req.session.user = user;
                req.session.uniqueid = user._id;
                res.redirect('/');  
            }
        });
    };
    
    
    
    
    
    user.logout = function (req, res) {
        if (req.session.user) {
            delete req.session.user;
        }
        
        res.redirect('/');
    };
    
    
    return user;
};

module.exports = userFactory();
