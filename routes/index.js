'use strict'

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('pages/index')
    })
    app.get('/about', (req, res) => {
        res.send('this will be about')
    })
    app.get('/login', (req, res) => {

    })
    app.get('/signup', (req, res) => {

    })
}