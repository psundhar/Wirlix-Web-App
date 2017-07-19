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
            },
            moderator: {
                type: Boolean,
                default: false,
            },
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
    challengerRead: {
        type: Boolean,
        default: true,
    },
    challengeeRead: {
        type: Boolean,
        default: false,
    },
});

const model = mongoose.model('Debate', debatesSchema);

const standardRelations = ['challenger', 'challengee', 'statement', 'topic'];

module.exports = {

    queryAll: function() {
        return model
            .find({deleted: false})
            .populate(standardRelations);
    },

    queryBest: function() {
        return model
            .find({deleted: false, views: {$gt: 0}})
            .limit(3)
            .populate(standardRelations);
    },

    queryLive: function() {
        return model
            .find({deleted: false, updated: {$gte: Date.now() - 300000 }}) // last five minutes
            .populate(standardRelations);
    },

    querySubscribed: function(userId) {
        return model
            .find({deleted: false, subscribers: {$all: [ userId ]}})
            .populate(standardRelations);
    },

    queryByTopicAndUser: function(topicId, userId) {
        return model
            .find({
                deleted: false,
                topic: topicId,
                $or: [{challenger: userId}, {challengee: userId}]
            })
            .populate(standardRelations);
    },

    default: model,
}