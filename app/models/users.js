
/*
    Variables
*/

var mongoose = require('mongoose'), 
    db = mongoose.createConnection('mongodb://localhost/nodebookmarks'), 
    Schema = mongoose.Schema,
    crypto = require('crypto'),    
    UserSchema, 
    User,
    makeSalt,
    BookmarkSchema,
    Bookmark,
    test = [];



    
/*
    Salt
*/

makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};





UserSchema = new Schema({

    id: Schema.ObjectId,
    
    name: {
        type: String
    },
    
    email: {
        type: String, 
        unique: true
    },
    
    date: {
        type: Date, 
        default: Date.now
    },
    
    salt: String,
    
    password: {
        type: String, 
        set: function (pass) {
            return this.hashPassword(pass);
        }
    }
});





UserSchema.methods.hashPassword = function hashPassword (password) {

    var salt = makeSalt(), cryp;
    
    this.salt = salt;
    cryp = crypto.createHmac('sha1', salt).update(password).digest('hex');
    
    return cryp;
};




User =  db.model('User', UserSchema);




exports.register = function (obj, fn) {

    var member = new User(obj);
    
    member.save(function (err) {
        fn(err, member);    
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




exports.remove = function (id, fn) {

    var Model =  db.model('User');

    Model.findById(id, function (err, user) {
        if (!(!!err) && (!!user)) {
            user.remove(); 
            fn(false);            
        } else {
            fn(true);
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
