const Statement = require('../models/statements');

module.exports = {
    postCollection: function(req, res, next) {
        const statement = new Statement.default({
            topic: req.body.topic,
            user: req.user._id,
            created: Date.now(),
            text: req.body.text,
            agreement: req.body.agreement,
            voters: [],
        });

        statement.save(function(err) {
            if(err) {
                console.log(err);
                res.status(422);

                next();
            }
            else {
                global.io.emit("updates:opinions", {_id: statement._id}); // Send message via socket.io
                res.send(statement);
            }
        });
    },

    getObject: function(req, res, next) {
        Statement.default.findById(req.params.id)
        .populate(['user', 'topic'])
        .exec()
        .then(function(s) {
            if(s) {
                res.send(s);
            }
            else throw ("Not found");
        })
        .catch(function(err) {
            console.log(err);
            return next();
        });
    },

    putObject: function(req, res, next) {
        Statement
            .default
            .findById(req.params.id)
            .exec()
            .then(function(s) {
                if(s) {
                    const user = req.user;
                    const existingVote = s.voters.find(v => v.user == user._id)
                    const isRational = req.body.isRational;

                    const text = req.body.text;

                    if(typeof text != 'undefined') {
                        s.text = text;
                    }

                    if(typeof isRational != 'undefined') {
                        if(existingVote) { // Change it to the new vote
                            existingVote.isRational = isRational;
                        }
                        else {
                            s.voters.push({user: user._id, isRational});
                        }
                    }

                    return s.save();
                }
                else {
                    throw("Statement not found");
                }
            })
            .then(function(s) {
                global.io.emit("updates:opinions", {_id: s._id}); // Send message via socket.io
                res.send(s);
            })
            .catch(function(err) {
                console.log(err);
                return next();
            });
    },
};