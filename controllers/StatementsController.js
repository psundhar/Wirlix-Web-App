const Statement = require('../models/statements');

module.exports = {
    postCollection: function(req, res, next) {
        const statement = new Statement.default({
            topic: req.body.topic,
            user: req.user._id,
            created: Date.now(),
            text: req.body.text,
            agreement: req.body.agreement,
        });

        statement.save(function(err) {
            if(err) {
                console.log(err);
                res.status(422);
                next();
            }
            else {
                res.send(statement);
            }
        });
    },

    putObject: function(req, res, next) {
        Statement
            .default
            .findById(req.params.id)
            .exec()
            .then(function(s) {
                if(s) {
                    return s.save();
                }
            })
            .then(function(s) {
                res.send(s);
            })
            .catch(function(err) {
                console.log(err);
                next();
            });
    },
};