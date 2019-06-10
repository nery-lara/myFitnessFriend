'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Food = require('../models/food')
const Strength = require('../models/strength')
const Cardio = require('../models/cardio')


module.exports = function (app) {
    app.post('/strength', (req, res) => {
        console.log(req.body)
        const strength = new Strength({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            weight: req.body.weight,
            sets: req.body.sets,
            reps: req.body.reps,
            date: req.body.date,
            time: req.body.time,
        })
        User.findOneAndUpdate({ email: req.body.email }, { $push: { 'exercises.strength': strength._id } }).exec().then(user => {
            console.log(user)
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'cant find user'
                })
            } else {
                strength.user = user._id
                strength.save().then(result => {
                    console.log(result)
                    res.status(201).render('pages/home')
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err,
                        message: "save error"
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })

    app.delete("/strength/:strengthid", (req, res) => {
        console.log(req.params.strengthid)
        Strength.findOneAndDelete({ _id: req.params.strengthid }).exec().then(strength => {

            User.findOneAndUpdate({ _id: strength.user }, { $pull: { 'exercises.strength': strength._id } }).then(user => {
                console.log("removed strength from user")
            }).catch(err => {
                console.log('cant update user')
                console.log(err)
            })
        }).catch(err => {
            console.log('cant delete strength')
            console.log(err)
        })
    })
}