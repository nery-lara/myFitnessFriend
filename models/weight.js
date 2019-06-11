const mongoose = require('mongoose')

const weightSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    weight: {type: Number, required: true },
    date: { type: Date, default: new Date(), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Weight', weightSchema)