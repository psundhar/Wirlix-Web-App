const debates = require('../models/debates');

module.exports = {
    getCollection: function(req, res) {
        debates.find({}).then(function(debates) {
            res.send(debates);
        });
    },
}
