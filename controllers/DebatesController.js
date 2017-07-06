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
}
