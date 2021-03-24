const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')

app.use('/api/places',placesRoutes)
app.use('/api/users', usersRoutes)

app.use((error, request, response, next ) => {
    if (response.headerSent){
        return next(error)
    }
    response.status(error.code || 500)
    response.json({Messages: error.message || 'An unknown error occured'})
})
module.exports = app