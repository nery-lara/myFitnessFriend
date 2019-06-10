const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    calories: {type: Number, required: true},
    protien: Number,
    carbs: Number,
    fat: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Food',foodSchema)