const express = require('express')
const app = express()
const path = require('path')
const logger = require('./middleware/logger')
const indexRoutes = require('./routes/index.js')
const homeRoutes = require('./routes/home.js')
const foodRoutes = require('./routes/food.js')
const cardioRoutes = require('./routes/cardio.js')
const strengthRoutes = require('./routes/strength.js')
const weightRoutes = require('./routes/weight.js')
const signup2Routes = require('./routes/signup2.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

var dbUrl = 'mongodb://localhost:27017/fitnessfriend'
mongoose.connect(dbUrl, {useNewUrlParser: true})
app.use(logger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
indexRoutes(app)
homeRoutes(app)
foodRoutes(app)
cardioRoutes(app)
strengthRoutes(app)
weightRoutes(app)
signup2Routes(app)
app.listen(PORT, console.log(`Server started ${PORT}`))
