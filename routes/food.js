'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Food = require('../models/food')
const Strength = require('../models/strength')
const Cardio = require('../models/cardio')


module.exports = function (app) {
    app.post('/food', (req, res) => {
        console.log(req.body)
        const food = new Food({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            calories: req.body.calories,
            protein: req.body.protein,
            carbs: req.body.carbs,
            fats: req.body.fats,
            date: req.body.date,
            time: req.body.time,
        })
        User.findOneAndUpdate({email: req.body.email}, {$push: {foods: food._id} }).exec().then(user => {
           console.log(user)
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'cant find user'
                })
            }else {
                food.user = user._id
                food.save().then(result => {
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

    app.delete("/food/:foodid",(req, res) => {
        console.log(req.params.foodid)
        Food.findOneAndDelete({_id: req.params.foodid}).exec().then(food => {
            
            User.findOneAndUpdate({_id: food.user}, {$pull: {foods: food._id}}).then(user => {
                console.log("removed food from user")
                
            }).catch(err => {
                console.log('cant update user')
                console.log(err)
            })
        }).catch(err => {
            console.log('cant delete food')
            console.log(err)
        })
    })
}