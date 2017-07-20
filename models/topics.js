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
    questions: {
        1: { type: String },
        2: { type: String },
        3: { type: String },
    },
});

const model = mongoose.model('Topic', topicSchema);

module.exports = {
    queryLatest: function() {
        return model.find({expires: {$gte: Date.now()}}).sort({expires: -1}).limit(1);
    },
    default: model,
};