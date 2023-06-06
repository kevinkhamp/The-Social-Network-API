const { Schema, model, Types } = require('mongoose')

const reactionSchema = new Schema({
    reactionsId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        reactions: [reactionSchema]
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
})

thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought