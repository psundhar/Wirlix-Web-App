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

        if( challenger && challengee && topic ) {
            const debate = new Debate({challenger: challenger, challengee: challengee, topic: topic, created: Date.now() });

            debate.save().then(function(debate) {
                res.send(debate);
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

        if(!req.params.id) {
            res.status(400);
            next();
        }

        Debate.findById(id).then(function(debate) {
            if(rational) {
                debate.rational += 1;
            }
            if(emotional) {
                debate.emotional += 1;
            }
            if(viewed) {
                debate.viewed += 1;
            }

            // TODO add in subscriber if subscribed is clicked

            return debate.save();
        })
        .then(function(savedDebate) {
            res.send(savedDebate);
        })
        .catch(function(err) {
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
