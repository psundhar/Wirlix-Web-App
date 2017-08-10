const users = require('../models/users');

module.exports = {
    putObject: function(req, res, next) {
        users
            .findById(req.params.id)
            .exec()
            .then(function(user) {
                if(!user) {
                    res.status(404);
                    return next();
                }

                // Make update;
                const body = req.body;

                if(body.bio) {
                    user.bio = body.bio;
                }

                return user.save();
            })
            .then(function(savedUser) {
                res.send(savedUser);
            })
            .catch(function(err) {
                console.log(err);
                return next();
            })
    },
};