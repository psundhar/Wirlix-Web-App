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
            .populate(['challenger', 'challengee']);
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

    default: model,
}