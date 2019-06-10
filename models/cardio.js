const mongoose = require('mongoose')

const cardioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    duration: Number,
})

module.exports = mongoose.model('Cardio', cardioSchema)