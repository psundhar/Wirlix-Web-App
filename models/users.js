var mongoose = require('mongoose');

// Create schema
var userSchema = mongoose.Schema({
    firstName: [{
        type: String,
        required: [true, 'Oops you forgot your first name!']
    }],
    lastName: [{
        type: String,
        required: [true, 'Oops you forgot your last name!']
    }],
    password: [{
        type: String,
        min: [6, 'Your password should be more than 6 characters.'],
        required: [true, 'Oops you forgot your password!']
    }],
    birthday: [{
        type: String,
        required: [true, 'Oops you forgot your password!']
    }],
    email: [{
        type: String,
        required: [true, 'Oops you forgot your password']
    }],
    phoneNumber: [{
        type: String,
        required: [true, 'Oops you forgot your email!'],
        unique: true
    }],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
