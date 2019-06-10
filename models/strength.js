const mongoose = require('mongoose')

const strengthSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    weight: Number,
    duration: Number,
    sets: Number,
    reps: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Strength', strengthSchema)