const debates = require('../models/debates');

module.exports = {
    getCollection: function(req, res) {
        res.send("Debates");
    },
}
