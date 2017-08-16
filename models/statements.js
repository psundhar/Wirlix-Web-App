const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const statementsSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: ObjectId,
        ref: 'Topic',
        required: true,
    },
   /* agreement: {
        type: String
    },*/
    text: {
        type: String,
    },
    created: {
        type: Date,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    voters: [
        { user: { type: ObjectId, ref: 'User'}, isRational: Boolean }
    ],
    views: {
        type: Number,
        default: 0,
    },
});

const model = mongoose.model('Statement', statementsSchema);

module.exports = {
    queryTopic: function(topicId) {
        return model
            .find({deleted: false, topic: topicId})
            .populate(['user', 'topic']);
    },

    queryByTopicAndUser: function(topicId, userId) {
        return model
            .findOne({deleted: false, topic: topicId, user: userId})
            .populate(['user', 'topic']);
    },

    default: model,
}
