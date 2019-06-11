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

    app.post('/weeklycalories', (req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        console.log(currDay.toString())
        currDay.setHours(0, 0, 0, 0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate())
        var startweekday = new Date(nextDay)
        startweekday.setDate(nextDay.getDate() - 6)
        console.log(startweekday.toISOString())
        console.log(currDay.toISOString())
        console.log(nextDay.toISOString())
        User.findOne({email: req.body.email}).populate({
            path:'foods',
            match: {
                date: {
                    $gte: startweekday,
                    $lt: nextDay
                }}
        }).sort({date: -1}).exec().then(user => { 
            console.log(user)
            console.log(user.foods)
            var dailycal = {}
            for(var x = 0; x < 7; x++){
                var day = new Date(nextDay)
                day.setDate(nextDay.getDate() - x)
                dailycal[day.toLocaleDateString()] = 0
            }
            for(var i = 0; i < user.foods.length; i++) {
                var date = new Date(user.foods[i].date)
                console.log(user.foods[i].calories)
                dailycal[date.toLocaleDateString()] += parseInt(user.foods[i].calories)
            }
            var labels = []
            var values = []
            Object.keys(dailycal).forEach(day => {
                labels.push(day)
                values.push(dailycal[day])
                
            });
            console.log(dailycal)
            res.status(201).json({
                labels: labels,
                values: values
            })
        }).catch(err => {
            console.log('couldnt get user')
            console.log(err)
        })
    })

    app.post('/weeklycardio', (req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        console.log(currDay.toString())
        currDay.setHours(0, 0, 0, 0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate())
        var startweekday = new Date(nextDay)
        startweekday.setDate(nextDay.getDate() - 6)
        console.log(startweekday.toISOString())
        console.log(currDay.toISOString())
        console.log(nextDay.toISOString())
        User.findOne({ email: req.body.email }).populate({
            path: 'exercises.cardio',
            match: {
                date: {
                    $gte: startweekday,
                    $lt: nextDay
                }
            }
        }).sort({ date: -1 }).exec().then(user => {
            console.log(user)
            console.log(user.exercises.cardio)
            var dailycardio = {}
            for (var x = 0; x < 7; x++) {
                var day = new Date(nextDay)
                day.setDate(nextDay.getDate() - x)
                dailycardio[day.toLocaleDateString()] = 0
            }
            for (var i = 0; i < user.exercises.cardio.length; i++) {
                var date = new Date(user.exercises.cardio[i].date)
                console.log(user.exercises.cardio[i].duration)
                var time = user.exercises.cardio[i].duration
                var hours = parseInt(time.split(':')[0])
                var min = parseInt(time.split(':')[1])
                var totalmin = min + (hours*60)
                dailycardio[date.toLocaleDateString()] += totalmin
            }
            var labels = []
            var values = []
            Object.keys(dailycardio).forEach(day => {
                labels.push(day)
                values.push(dailycardio[day])

            });
            console.log(dailycardio)
            res.status(201).json({
                labels: labels,
                values: values
            })
        }).catch(err => {
            console.log('couldnt get user')
            console.log(err)
        })
    })

    app.post('/weeklycardiodistance', (req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        console.log(currDay.toString())
        currDay.setHours(0, 0, 0, 0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate())
        var startweekday = new Date(nextDay)
        startweekday.setDate(nextDay.getDate() - 6)
        console.log(startweekday.toISOString())
        console.log(currDay.toISOString())
        console.log(nextDay.toISOString())
        User.findOne({ email: req.body.email }).populate({
            path: 'exercises.cardio',
            match: {
                date: {
                    $gte: startweekday,
                    $lt: nextDay
                }
            }
        }).sort({ date: -1 }).exec().then(user => {
            console.log(user)
            console.log(user.exercises.cardio)
            var dailycardio = {}
            for (var x = 0; x < 7; x++) {
                var day = new Date(nextDay)
                day.setDate(nextDay.getDate() - x)
                dailycardio[day.toLocaleDateString()] = 0
            }
            for (var i = 0; i < user.exercises.cardio.length; i++) {
                var date = new Date(user.exercises.cardio[i].date)
                console.log(user.exercises.cardio[i].distance)
                    dailycardio[date.toLocaleDateString()] += user.exercises.cardio[i].distance
            }
            var labels = []
            var values = []
            Object.keys(dailycardio).forEach(day => {
                labels.push(day)
                values.push(dailycardio[day])

            });
            console.log(dailycardio)
            res.status(201).json({
                labels: labels,
                values: values
            })
        }).catch(err => {
            console.log('couldnt get user')
            console.log(err)
        })
    })


    app.post('/weeklystrength', (req, res) => {
        console.log(req.body)
        var currDay = new Date(req.body.date)
        console.log(currDay.toString())
        currDay.setHours(0, 0, 0, 0)
        var nextDay = new Date(currDay)
        nextDay.setDate(nextDay.getDate())
        var startweekday = new Date(nextDay)
        startweekday.setDate(nextDay.getDate() - 6)
        console.log(startweekday.toISOString())
        console.log(currDay.toISOString())
        console.log(nextDay.toISOString())
        User.findOne({ email: req.body.email }).populate({
            path: 'exercises.strength',
            match: {
                date: {
                    $gte: startweekday,
                    $lt: nextDay
                }
            }
        }).sort({ date: -1 }).exec().then(user => {
            console.log(user)
            console.log(user.exercises.strength)
            var dailystrength = {}
            for (var x = 0; x < 7; x++) {
                var day = new Date(nextDay)
                day.setDate(nextDay.getDate() - x)
                dailystrength[day.toLocaleDateString()] = 0
            }
            for (var i = 0; i < user.exercises.strength.length; i++) {
                var date = new Date(user.exercises.strength[i].date)
                dailystrength[date.toLocaleDateString()] += 1
            }
            var labels = []
            var values = []
            Object.keys(dailystrength).forEach(day => {
                labels.push(day)
                values.push(dailystrength[day])

            });
            console.log(dailystrength)
            res.status(201).json({
                labels: labels,
                values: values
            })
        }).catch(err => {
            console.log('couldnt get user')
            console.log(err)
        })
    })
}