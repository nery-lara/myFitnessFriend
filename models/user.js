const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    birthdate: {type: Date, default: Date.now, required: true},
    loggedin: {type: Boolean, default: false},
    exercises: {
        cardio:[{type: mongoose.Schema.Types.ObjectId, ref: 'Cardio'}],
        strength: [{type: mongoose.Schema.Types.ObjectId, ref: 'Strength'}]
    },
    foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
})

module.exports = mongoose.model('User', userSchema)