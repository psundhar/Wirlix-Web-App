const Debate = require('../models/debates');

module.exports = {
    getCollection: function(req, res, next) {
        Debate
            .queryAll()
            .exec()
            .then(function(debates) {
                res.send(debates);
            })
            .catch(function(err) {
                console.log(err);
            });
    },

    getMyDebates: function(req, res) {
        // grab user info from passport middleware
        // Find debates where either the challenger or challengee
        // Debate
        //     .find(
        //         {deleted: false, challenger: }
        //     )
    },

    postCollection: function(req, res, next) {
        const body = req.body;

        const challenger = body.challenger;
        const challengee = body.challengee;
        const topic = body.topic;
        const statement = body.statement;

        if( challenger && challengee && topic ) {
            const debate = new Debate.default({challenger: challenger, challengee: challengee, topic: topic, created: Date.now() });

            if(statement) {
                debate.statement = statement;
            }

            debate.save().then(function(debate) {
                Debate.default.populate(debate, [{ path: 'challenger' }, { path: 'challengee'}, {path: 'statement'}, {path: 'topic'}], function(err, d) {
                    res.send(d);
                });
            });
        }
        else {
            res.status(400);
            next();
        }
    },

    putObject: function(req, res, next) {
        const id = req.params.id;
        const rational = req.body.rational;
        const emotional = req.body.emotional;
        const viewed = req.body.viewed;
        const subscribed = req.body.subscribed;
        const message = req.body.message;

        if(!id) {
            res.status(400);
            next();
        }

        Debate.default.findById(id).then(function(debate) {
            if(rational) {
                debate.rational += 1;
            }
            if(emotional) {
                debate.emotional += 1;
            }
            if(viewed) {
                debate.viewed += 1;
            }
            if(subscribed == 'subscribe') {
                debate.subscribers.push(req.user._id);
            }
            if(subscribed == 'unsubscribe') {
                debate.subscribers = debate.subscribers.filter(subId => {
                    return !subId.equals(req.user._id);
                });
            }
            if(message) {
                debate.messages.push(message);
            }

            return debate.save();
        })
        .then(function(savedDebate) {
            res.send(savedDebate);
        })
        .catch(function(err) {
            console.log(err);
            res.status(404);
            next();
        })
    },

    deleteObject: function(req, res, next) {
        const id = req.params.id;

        Debate.findById(id).then(function(debate) {
            debate.deleted = true;
            return debate.save();
        })
        .then(function(savedDebate) {
            res.send({});
        })
        .catch(function(err) {
            res.status(404);
            next();
        });

    }
}
