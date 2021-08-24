const HttpError = require('../models/http-error')
const jwt = require('jsonwebtoken')
module.exports = (request, response, next) => {
	if (request.method === 'OPTIONS') {
		next()
	}
	try {
		const token = request.headers.authorization.split(' ')[1]
		if (!token) {
			throw new Error('Authentication failed')
		}
		const decodeToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN')
		next()
		request.userData = { userId: decodeToken.userId }
	} catch (error) {
		error = new HttpError('Authentication failed', 401)
		return next(error)
	}
}
