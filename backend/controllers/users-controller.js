const { v4: uuidv4 } = require('uuid')
const HttpError = require('../models/http-error')
const validator = require('express-validator')

const User = require('../models/User')

exports.getAllUsers = (request, response, next) => {
	User.find({}, '-password')
		.then((users) => response.status(200).json({ users }))
		.catch((error) => {
			error = new HttpError("There's no users in this place", 404)
		})
}

exports.signUp = (request, response, next) => {
	const errors = validator.validationResult(request)

	if (!errors.isEmpty()) {
		const error = new HttpError(
			'Invalid input passes, please check your data',
			422
		)
		return next(error)
	}
	const { name, email, password } = request.body

	User.findOne({ email: email })
		.then((user) => {
			if (user) {
				const error = new HttpError('User exists already, please login', 422)
				return next(error)
			}
		})
		.catch((error) => {
			error = new HttpError('Signing up failed, please try aigain later', 500)
			return next(error)
		})

	const createUser = new User({
		name,
		email,
		password,
		image:
			'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
	})
	createUser
		.save()
		.then(() => response.status(200).json({ users: createUser }))
		.catch((error) => {
			error = new HttpError('Faild signing up, please contact the comapny')
			return next(error)
		})
}

exports.login = (request, response, next) => {
	const { email, password } = request.body
	User.findOne({ email: email })
		.then((user) => {
			if (!user)
				return response
					.status(401)
					.json({ error: 'This user is not in the database' })
			if (password !== user.password)
				return response.status(401).json({ error: 'Wrong password' })
			response.status(200).json({ message: 'Logged In' })
		})
		.catch((error) => response.status(500).json({ error }))
}
