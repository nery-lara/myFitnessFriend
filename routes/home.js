'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Food = require('../models/food')
const Strength = require('../models/strength')
const Cardio = require('../models/cardio')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (app) {
    
    app.post('/load',(req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        console.log(currDay.toString())
        currDay.setHours(0,0,0,0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate() + 1)
        console.log(currDay.toISOString())
        console.log(nextDay.toISOString())
        User.find({email: req.body.email}).populate({
            path: 'foods',
            match: { date: {
                $gte: currDay,
                $lt: nextDay
            }}
        }).populate({
            path: 'exercises.cardio',
            match: {
                date: {
                    $gte: currDay,
                    $lt: nextDay
                }
            }
        }).populate({
            path: 'exercises.strength',
            match: {
                date: {
                    $gte: currDay,
                    $lt: nextDay
                }
            }
        }).exec().then(user => {
            console.log(user)
            console.log(user[0].foods)
            console.log(user[0].exercises.cardio)
            console.log(user[0].exercises.strength)
            res.status(201).json({
                foods: user[0].foods,
                cardio: user[0].exercises.cardio,
                strength: user[0].exercises.strength
            })
        }).catch(err => {
            console.log(err)
        })
    })
}