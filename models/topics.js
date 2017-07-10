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
    image: {
        type: String,
    },
});

const model = mongoose.model('Topic', topicSchema);

module.exports = {
    queryLatest: function() {
        return model.findOne({expires: {$gte: Date.now()}});
    },
    default: model,
};