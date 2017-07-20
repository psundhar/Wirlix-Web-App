const Topic = require('../models/topics');

module.exports = {
    getCurrent: function(req, res) {
        Topic.queryLatest()
            .exec()
            .then(function(topicResults) {
                res.send(topicResults[0]);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
}
