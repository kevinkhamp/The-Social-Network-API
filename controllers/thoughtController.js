const { Thought } = require('../models')

module.exports = {
    // Get all thoughts
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Get a thought
    async getAThought (req,res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v')

            if (!thought) {
                return res.status(404).json({message: 'Head empty.'})
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Create a thought
    async createThought (req,res) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    // Delete a thought
    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId})

            if (!thought) {
                res.status(404).json({message: 'Head empty.'})
            }
            res.json({message: 'Head is now empty.'})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Update a thought
    
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
             )
            if (!thought) {
                 res.status(404).json({message: 'Thought not in head.'})
             }
            res.json(thought)
        } catch (err) {
                res.status(500).json(err)
        }
     },
    //  Add a reaction
    async addReaction(req,res) {
        console.log('You are reacting.')
        console.log(req.body)

        try {
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thoughts here.'})
            }

            res.json(err)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Remove reaction
    async removeReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionsId}}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought here.'})
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    
}