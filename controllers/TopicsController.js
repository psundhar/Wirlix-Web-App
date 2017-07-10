const Topic = require('../models/topics');

module.exports = {
    getCurrent: function(req, res) {
        Topic.queryLatest()
            .exec()
            .then(function(topic) {
                res.send(topic);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
}
