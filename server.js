const express = require('express')
const app = express()
const path = require('path')
const logger = require('./middleware/logger')
const routes = require('./routes/index.js')
const mongo = require('mongodb')
const PORT = process.env.PORT || 5000
var MongoClient = mongo.MongoClient
var dbUrl = 'mongodb://localhost:27017/fitnessfriend'
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, db) => {
    db.db('fitnessfrient').createCollection('users', (err, res) => {
        console.log('user db created')
        db.close()
    })
})
app.use(logger)

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
routes(app)
app.listen(PORT, console.log(`Server started ${PORT}`))
