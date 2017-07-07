const Topic = require('../models/topics');

module.exports = {
    getCurrent: function(req, res) {
        Topic.findOne({expires: {$gte: Date.now()}})
            .exec()
            .then(function(topic) {
                res.send(topic);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
}
