'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = function (app) {


    app.post('/signup2',(req, res) => {
        console.log(req.body)
        User.find({email: req.body.email}).exec().then(user =>{
          user[0].loggedin = true
          user[0].gender = req.body.gender
          user[0].weight = req.body.weight
          user[0].height = req.body.height
          user[0].activity_level = req.body.actlevs
          user[0].goals = req.body.goals
          user[0].exercise_goal = req.body.exergoals
          user[0].save().then(result => {
            console.log(result)
            return res.status(200).render('pages/home')
          }).catch(err => {
            console.log(err)
            res.status(500).json({
              error: err,
              message: "save error"
            })
          })
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
    })
    app.post('/goHome',(req, res) => { // for later
      return res.status(200).render('pages/index')
    })
  }
