'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Food = require('../models/food')
const Strength = require('../models/strength')
const Cardio = require('../models/cardio')


module.exports = function (app) {
    app.post('/cardio', (req, res) => {
        console.log(req.body)
        const cardio = new Cardio({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            duration: req.body.duration,
            distance: req.body.distance,
            time: req.body.time,
        })
        User.findOneAndUpdate({ email: req.body.email }, { $push: { 'exercises.cardio': cardio._id } }).exec().then(user => {
            console.log(user)
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'cant find user'
                })
            } else {
                cardio.user = user._id
                cardio.save().then(result => {
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

    app.delete("/cardio/:cardioid", (req, res) => {
        console.log(req.params.cardioid)
        Cardio.findOneAndDelete({ _id: req.params.cardioid }).exec().then(cardio => {

            User.findOneAndUpdate({ _id: cardio.user }, { $pull: { 'exercises.cardio': cardio._id } }).then(user => {
                console.log("removed cardio from user")
            }).catch(err => {
                console.log('cant update user')
                console.log(err)
            })
        }).catch(err => {
            console.log('cant delete cardio')
            console.log(err)
        })
    })
}