const Challenge = require('../models/challenges');
const Statement = require('../models/statements');
const Topic = require('../models/topics');

const ChallengesController = {
    getNotifications: function(req, res, next) {
        Topic.queryLatest()
            .then(function(topic) {
                return Challenge.queryByUserAndTopicAndNotification(req.user._id, topic._id);
            })
            .then(function(challenges) {
                res.send(challenges);
            })
            .catch(function(err) {
                console.log(err);
                res.end();
            })
    },

    putObject: function(req, res, next) {
        const body = req.body;

        Challenge.default
            .findById(req.params.id)
            .exec()
            .then(function(challenge) {
                if(challenge) {
                    challenge.status = body.status;

                    if(typeof body.notifyChallenger != 'undefined') {
                        challenge.notifyChallenger = body.notifyChallenger;
                    }
                    if(typeof body.notifyChallengee != 'undefined') {
                        challenge.notifyChallengee = body.notifyChallengee;
                    }

                    challenge.save(function(err) {
                        if(err) {
                            console.log(err);
                            res.status(422);
                            res.end();
                        }
                        else {
                            res.send(challenge);
                        }
                    });
                }
                else throw "Not found";
            })
            .catch(function(err) {
                console.log(err);
                res.status(404);
                res.end();
            });
    },

    postCollection: function(req, res, next) {
        const body = req.body;
        Statement.default
        .findById(body.statement)
        .exec()
        .then(function(statement) {

            const challenge = new Challenge.default({statement: statement._id, topic: body.topic, challengee: statement.user, challenger: body.challenger, notifyChallengee: true, created: Date.now() });

            challenge.save(function(err) {
                if(err) {
                    console.log(err);
                    res.status(422);
                    res.end();
                }

                global.socket.emit("notifications", challenge);

                res.send(challenge);
            });
        })
        .catch(function(err) {
            console.log(err);
            return next();
        });
    },
};

module.exports = ChallengesController;