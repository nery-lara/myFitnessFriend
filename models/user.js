const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    birthdate: {type: Date, default: Date.now, required: true},
    loggedin: {type: Boolean, default: false},
    gender: {type: String, default: "None"}, //
    weight: {type: Number, default: 0},
    height: {type: String, default: "5'4"},
    activity_level: {type: String, default: "low"},
    goal: {type: String, default: "lose weight"},
    exercise_goal: {type: String, default: "None"}, 
    weightlog: [{type: mongoose.Schema.Types.ObjectId, ref: 'Weight'}],
    exercises: {
        cardio:[{type: mongoose.Schema.Types.ObjectId, ref: 'Cardio'}],
        strength: [{type: mongoose.Schema.Types.ObjectId, ref: 'Strength'}]
    },
    foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
})

module.exports = mongoose.model('User', userSchema)
