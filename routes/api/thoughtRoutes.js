const router = require('express').Router()

const {
    getThoughts,
    getAThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getAThought).delete(deleteThought).put(updateThought)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(removeReaction)