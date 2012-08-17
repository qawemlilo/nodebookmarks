var mongoose = require('mongoose'), 
    db = mongoose.createConnection('mongodb://localhost/nodebookmarks'), 
    Schema = mongoose.Schema,
    crypto = require('crypto'),    
    UserSchema, User, validEmail, validString,
    makeSalt,
    BookmarkSchema,
    Bookmark,
    test = [];

    
/*
    Validation functions
*/

makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};


validString = function (v) {
    return typeof v === 'string' && v.length > 2;
};


validEmail = function (emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        
    return pattern.test(emailAddress);
};


UserSchema = new Schema({
    id: Schema.ObjectId,
    name: {type: String, validate: validString},
    email: {type: String, unique: true, validate: validEmail},
    date: {type: Date, default: Date.now},
    salt: String,
    password: {type: String, set: function (pass) {return this.hashPassword(pass);}}
});


UserSchema.methods.hashPassword = function hashPassword (password) {
    var salt = makeSalt();
    this.salt = salt;
    var cryp = crypto.createHmac('sha1', salt).update(password).digest('hex');
    
    return cryp;
};

User =  db.model('User', UserSchema);


exports.register = function (obj, fn) {
    var member = new User(obj);
    member.save(function (err) {
        fn(err);    
    });
};


exports.login = function (obj, fn) {
    var Model =  db.model('User');

    Model.findOne({email:  obj.email}, function (err, user) {
        if (!(!!err) && (!!user)) {
            var passwordHash = crypto.createHmac('sha1', user.salt).update(obj.password).digest('hex');
            
            if (!(user.password === passwordHash)) {
                fn(true, {});
                return;  
            } else {
                fn(false, user);
                return; 
            }  
            
        } else {
            fn(true, {});
            return;
        }
    });    
};


exports.update = function (id, obj, fn) {
    var Model =  db.model('User'), changed = false;
    
    Model.findById(id, function (err, user) {
        if (!(!!err) && (!!user)) {
        
            if (obj.name && user.name !== obj.name) {
                user.name = obj.name;
                changed = true;
            }
            if (obj.email && user.email !== obj.email) {
                user.email = obj.email;
                changed = true;
            }
            
            if (obj.password && obj.password.length >= 6) {
                user.password = obj.password; 
                changed = true;
            }
            
            if (changed) {
                user.save(function (err) {
                    if (!!err) {
                        fn(true, {});
                    }
                    else {
                        fn(false, user);
                    }
                });
            }
            
        } else {
            fn(true, {});
        }
    });    
};


exports.getUsers = function (id, fn) {
    var Model =  db.model('User');
    
    Model.where('_id').ne(id).exec(function (err, users) {
        fn(err, users);
    });
};


/*
    Export some helper functions
*/

exports.validEmail = validEmail;

exports.validString = validString;