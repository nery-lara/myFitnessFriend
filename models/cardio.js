const mongoose = require('mongoose')

const cardioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    duration: String,
    distance: Number,
    time: String,
    date: { type: Date, default: new Date(), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Cardio', cardioSchema)