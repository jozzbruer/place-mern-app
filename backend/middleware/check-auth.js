const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
module.exports = (request, response, next) => {
	if (request.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = request.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed');
		}
		const decodeToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
		request.userData = { userId: decodeToken.userId };
		next();
	} catch (err) {
		const error = new HttpError('Authentication failed', 401);
		return next(error);
	}
};
