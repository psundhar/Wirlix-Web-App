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
        required: [true, 'Oops you forgot your e-mail'],
        unique: true,
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
    bio: {
        type: String,
    },
    resettoken:
        { type: String,
            required: false
        },
});

module.exports = mongoose.model('User', userSchema);
