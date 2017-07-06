const mongoose = require('mongoose');

const debatesSchema = mongoose.Schema({
    challenger: {
        type: String,
    },
    challengee: {
        type: String,
    },
    topic: {
        type: String,
    }
});

module.exports = mongoose.model('Debate', debatesSchema);