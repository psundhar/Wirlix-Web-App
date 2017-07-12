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
});

const model = mongoose.model('Statement', statementsSchema);

module.exports = {

    queryAll: function() {
        return model
            .find({deleted: false})
            .populate(['user', 'topic']);
    },

    default: model,
}
