const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const debatesSchema = mongoose.Schema({
    challenger: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    challengee: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: ObjectId,
        ref: 'Topic',
        required: true,
    },
    statement: {
        type: ObjectId,
        ref: 'Statement',
    },
    messages: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
            },
            created: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
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
    rational: {
        type: Number,
        default: 0,
    },
    emotional: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    subscribers: [
        {type: ObjectId, ref: 'User'}
    ],
});

const model = mongoose.model('Debate', debatesSchema);

module.exports = {

    queryAll: function() {
        return model
            .find({deleted: false})
            .populate(['challenger', 'challengee', 'statement', 'topic']);
    },

    queryBest: function() {
        return model
            .find({deleted: false, views: {$gt: 0}})
            .limit(3)
            .populate(['challenger', 'challengee']);
    },

    queryLive: function() {
        return model
            .find({deleted: false, updated: {$gte: Date.now() - 300000 }}) // last five minutes
            .populate(['challenger', 'challengee']);
    },

    querySubscribed: function(userId) {
        return model
            .find({deleted: false, subscribers: {$all: [ userId ]}})
            .populate(['challenger', 'challengee']);
    },

    queryByTopicAndUser: function(topicId, userId) {
        return model
            .find({
                deleted: false,
                topic: topicId,
                $or: [{challenger: userId}, {challengee: userId}]
            })
            .populate(['challenger', 'challengee', 'statement', 'topic']);
    },

    default: model,
}