const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')

const HttpError = require('./models/http-error')

mongoose
	.connect(
		'mongodb+srv://joz:bouzen3@mern.aoodt.mongodb.net/MernData?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		}
	)
	.then(() => console.log('Connection to MongoDB success'))
	.catch(() => console.log('Connection Failed'))
const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

app.use((request, response, next) => {
	const error = new HttpError('We cannot find this route', 404)
	return next(error)
})

app.use((error, request, response, next) => {
	if (response.headerSent) {
		return next(error)
	}
	response.status(error.code || 500)
	response.json({ Messages: error.message || 'An unknown error occured' })
})
module.exports = app
