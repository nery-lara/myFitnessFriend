'use strict'
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('pages/index')
    })

    app.post('/login', (req, res) => {
        console.log(req.body)
        User.find({email: req.body.email}).exec().then(user => {
            if(user.length < 1) {
                return res.status(401).send({
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
                    },'secretkey', {
                        expiresIn: "2h"
                    })
                    //if the user has completed the second signup page
                    if(user[0].gender == "None"){
                      return res.status(201).render('pages/signup2')
                    }
                    else{
                      return res.status(200).render('pages/home')
                    }
                    //else
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
                            error: err,
                            message: "hash error"
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then(result => {
                            console.log(result)
                            res.status(201).render('pages/signup2')
                        }).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err,
                                message: "save error"
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
