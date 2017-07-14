const Challenge = require('../models/challenges');
const Statement = require('../models/statements');

const ChallengesController = {
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