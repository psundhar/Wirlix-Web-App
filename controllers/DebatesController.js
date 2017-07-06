const Debate = require('../models/debates');

module.exports = {
    getCollection: function(req, res) {
        Debate.find({}).then(function(debates) {
            res.send(debates);
        });
    },

    postCollection: function(req, res) {
        const challenger = req.body.challenger;
        const challengee = req.body.challengee;
        const topic = req.body.topic;

        if( challenger && challengee && topic ) {
            const debate = new Debate({challenger: challenger, challengee: challengee, topic: topic, created: Date.now() });

            debate.save().then(function(debate) {
                res.send(debate);
            });
        }
        else {
            res.status(400);
            res.send({"error": "Improper request"});
        }
    },

    putObject: function(req, res) {
        const id = req.params.id;
        const rational = req.body.rational;
        const emotional = req.body.emotional;

        if(!req.params.id || (!rational && !emotional)) {
            res.status(400);
            res.send({"error": "Improper request"});
        }

        Debate.findById(id).then(function(debate) {
            if(rational) {
                debate.rational += 1;
            }
            if(emotional) {
                debate.emotional += 1;
            }
            return debate.save();
        })
        .then(function(savedDebate) {
            res.send(savedDebate);
        })
        .catch(function(err) {
            res.status(404);
            res.send({"error": "Not found"});
        })
    },

    deleteObject: function(req, res) {
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
            res.send({"error": "Not found"});
        });

    }
}
