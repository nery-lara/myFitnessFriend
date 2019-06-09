const express = require('express')
const app = express()
const path = require('path')
const logger = require('./middleware/logger')
const routes = require('./routes/index.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

var dbUrl = 'mongodb://localhost:27017/fitnessfriend'
mongoose.connect(dbUrl, {useNewUrlParser: true})
app.use(logger)
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
routes(app)
app.listen(PORT, console.log(`Server started ${PORT}`))
