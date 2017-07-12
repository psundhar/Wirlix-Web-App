const Statement = require('../models/statements');

module.exports = {
    postCollection: function(req, res, next) {
        console.log(req.body.topic, req.body);
        const statement = new Statement.default({
            topic: req.body.topic,
            user: req.user._id,
            created: Date.now(),
        });

        statement.save(function(err) {
            if(err) {
                console.log(err);
                next();
            }
            else {
                res.send(statement);
            }
        });
    },
};