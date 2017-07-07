const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
    },
    expires: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Topic', topicSchema);