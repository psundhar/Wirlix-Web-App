const mongoose = require('mongoose');

const debatesSchema = mongoose.Schema({
    challenger: {
        type: String,
        required: true,
    },
    challengee: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
    },
    updated: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Debate', debatesSchema);