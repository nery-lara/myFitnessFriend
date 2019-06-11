'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Food = require('../models/food')
const Strength = require('../models/strength')
const Cardio = require('../models/cardio')
const Weight = require('../models/weight')


module.exports = function (app) {
    app.post('/weight', (req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        currDay.setHours(0, 0, 0, 0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate() + 1)
        const weight = new Weight({
            _id: new mongoose.Types.ObjectId(),
            weight: req.body.weight,
            date: req.body.date
        })

        Weight.findOneAndUpdate({ date: {
            $gte: currDay,
            $lt: nextDay
        }},{weight: req.body.weight}).exec().then( doc => {
            if(doc) {
                console.log(doc)
                console.log('updated weight')
                return res.status(204).json({
                    message: "updated successfully"
                })
            }else{
                console.log('weightdoesntexist')
                User.findOneAndUpdate({ email: req.body.email }, { $push: { 'weightlog': weight._id } }).exec().then(user => {
                    console.log(user)
                    if (!user) {
                        return res.status(401).json({
                            message: 'cant find user'
                        })
                    } else {
                        weight.user = user._id
                        weight.save().then(result => {
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
            }
        }).catch(err => {
            console.log(err)

        })
        
    })
    app.post('/weights', (req, res) => {
        User.findOne({email: req.body.email}).populate({
            path: 'weightlog',
            options: { sort: { date: 1}}
        }).sort({date: 1}).exec().then(user => {
            var labels = []
            var values = []
            if(user){
                console.log(user)
                for (var i = 0; i < user.weightlog.length; i++){
                    labels.push(user.weightlog[i].date.toLocaleDateString())
                    values.push(user.weightlog[i].weight)
                }
                labels.sort(function (a, b) {  return new Date(b.date) - new Date(a.date);
                });
                res.status(201).json({
                    labels: labels,
                    values: values
                })
            }else{
                res.status(404).json({
                    message: "not found"
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })

    app.delete("/weight/:weightid", (req, res) => {
        console.log(req.params.weightid)
        Weight.findOneAndDelete({ _id: req.params.weightid }).exec().then(weight => {
            User.findOneAndUpdate({ _id: weight.user }, { $pull: { 'weightlog': weight._id } }).then(user => {
                console.log("removed weight from user")
            }).catch(err => {
                console.log('cant update user')
                console.log(err)
            })
        }).catch(err => {
            console.log('cant delete weight')
            console.log(err)
        })
    })
}