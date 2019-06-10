const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    calories: {type: Number, required: true},
    protein: Number,
    carbs: Number,
    fats: Number,
    time: String,
    date: { type: Date, default: new Date(), required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Food',foodSchema)