import jwt from 'jsonwebtoken';
import HttpError from '../models/http-error.js';

export const checkAuth = (request, response, next) => {
	if (request.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = request.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed');
		}
		const decodeToken = jwt.verify(token, process.env.JWT_KEY);
		request.userData = { userId: decodeToken.userId };
		next();
	} catch (err) {
		const error = new HttpError('Authentication failed', 401);
		return next(error);
	}
};
