const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ChallengesSchema = mongoose.Schema({
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
    statement: {
        type: ObjectId,
        ref: 'Statement',
        required: true,
    },
    topic: {
        type: ObjectId,
        ref: 'Topic',
        required: true,
    },
    notifyChallengee: {
        type: Boolean,
        default: false,
    },
    notifyChallenger: {
        type: Boolean,
        default: false,
    },
    status: {
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
});

const model = mongoose.model('Challenge', ChallengesSchema);

module.exports = {
    default: model,
    queryByUserAndTopic: function(userId, topicId) {
        return model.find({topic: topicId, $or: [{challenger: userId}, {challengee: userId}]}).populate(['challenger', 'challengee', 'statement']);
    },
    queryByUserAndTopicAndNotification: function(userId, topicId) {
        return model.find({topic: topicId, $or: [{challenger: userId, notifyChallenger: true}, {challengee: userId, notifyChallengee: true}]}).populate(['challenger', 'challengee', 'statement']);
    },
};