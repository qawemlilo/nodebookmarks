
/*
 * GET home page.
 */
exports.index = function (req, res) {
    if (req.session.user) {
       res.render('home', {title: 'Home', page: 'home', loggedIn: true, user: req.session.user});       
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

exports.update = function (req, res, connect) {
    if (req.session.user) {
        var user = req.session.user;
        
        if (connect.validString(req.body.name) &&  connect.validEmail(req.body.email)) {
            connect.update(user._id, {name: req.body.name, email: req.body.email, password: req.body.password}, function (err, currentuser) {
                if (err) {
                    res.send({error: true, msg: 'An error occured, account info not updated'});
                } else {
                    currentuser._id = currentuser._id.toHexString();
                    req.session.user = currentuser; 
                    res.send({error: false, msg: 'Account info successfully updated'});                    
                }
            });
        }
    } else {
        res.send({error: true, msg: 'You are not logged in'});
    }
};



/*
 * POST Register user.
*/
exports.register = function (req, res, connect) {
    if (req.session.user) {
       res.send({error: true, msg: 'You are already logged'});  
    } else if (connect.validString(req.body.name) &&  connect.validEmail(req.body.email) &&  connect.validString(req.body.password)) {
        connect.register({name: req.body.name, email: req.body.email, password: req.body.password}, function (err) {
            if (err) {
                res.send({error: true, msg: 'An error occured, account not created'});
            } else {
                res.send({error: false, msg: 'Thank you ' + req.body.name + ' for signing up, you may login now'});  
            }
        });  
    } else {
        res.send({error: true, msg: 'Account not created, invalid input'});  
    }
};


/*
 * POST Authenticate log in
*/

exports.login = function (req, res, connect) {
    if (req.session.user) {
       res.send({error: false, msg: 'Already logged in'}); 
    } else if (connect.validEmail(req.body.email) || connect.validString(req.body.password)) {
    
        connect.login({email: req.body.email, password: req.body.password}, function (err,  user) {
            if (err) {
                res.send({error: true, msg: 'Invalid email / password combination'}); 
            } else {
                user._id = user._id.toHexString();
                req.session.user = user;
                res.send({error: false, msg: 'Login successful'});  
            }
        });
        
    } else {
       res.send({error: true, msg: 'Invalid input'});
    }
};

