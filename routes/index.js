'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authCheck = require('../middleware/authcheck')

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('pages/index')
    })
    
    app.get('/home', authCheck, (req, res) => {
        res.render('pages/home')
    })

    app.get('/login', (req, res) => {
        User.find({email: req.body.email}).exec().then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'authentication failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'authentication failed'
                    }) 
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },process.env.JWT_KEY, {
                        expiresIn: "2h"
                    })
                    return res.status(200).json({
                        message: 'Authentication successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'authentication failed'
                }) 
            })
        })
        
    })
    app.post('/signup', (req, res) => {
        console.log(req.body)
        User.find({email: req.body.email}).exec().then(user =>{
            if(user.length >= 1){
                return res.status(422).json({
                    message: 'email exists'
                })
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'user created'
                            })
                        }).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })

    app.delete("/:userId", (req, res) => {
        User.remove({_id: req.params.userId}).exec().then(result => {
            res.status(200).json({
                message: "user deleted"
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })
    
}