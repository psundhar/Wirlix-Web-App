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