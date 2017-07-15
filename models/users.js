var mongoose = require('mongoose');

// Create schema
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        min: [6, 'Your password should be more than 6 characters.'],
        required: [true, 'Oops you forgot your password!']
    },
    birthday: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Oops you forgot your password']
    },
    phoneNumber: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);
