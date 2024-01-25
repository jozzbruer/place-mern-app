import validator from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import HttpError from '../models/http-error.js';

export const getAllUsers = async (request, response, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError('Fetching users failed, please try again later.', 500);
		return next(error);
	}
	response.status(200).json({ users });
};

export const signUp = (request, response, next) => {
	const errors = validator.validationResult(request);

	if (!errors.isEmpty()) {
		const error = new HttpError('Invalid input passes, please check your data', 422);
		return next(error);
	}
	const { name, email, password } = request.body;

	User.findOne({ email: email })
		.then((user) => {
			if (user) {
				const error = new HttpError('User exists already, please login', 422);
				return next(error);
			}
		})
		.catch((err) => {
			const error = new HttpError('Signing up failed, please try aigain later', 500);
			return next(error);
		});

	bcrypt
		.hash(password, 12)
		.then((hash) => {
			const createUser = new User({
				name,
				email,
				password: hash,
				image: request.file.path,
			});
			createUser
				.save()
				.then(() =>
					response.status(200).json({
						userId: createUser._id,
						email: createUser.email,
						token: jwt.sign(
							{ userId: createUser._id, email: createUser.email },
							process.env.JWT_KEY,
							{ expiresIn: '1h' }
						),
					})
				)
				.catch((err) => {
					const error = new HttpError('Failed signing up, please contact the comapny', 500);
					return next(error);
				});
		})
		.catch((err) => {
			const error = new HttpError('Encryption failed', 501);
			return next(error);
		});
};

export const login = async (request, response, next) => {
	const { email, password } = request.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Loggin in failed, please try again later.', 500);
		return next(error);
	}

	if (!existingUser) {
		const error = new HttpError('Invalid credentials, could not log you in.', 401);
		return next(error);
	}
	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		const error = new HttpError('Invalid password', 404);
		return next(error);
	}
	if (!isValidPassword) {
		const error = new HttpError('Invalid password', 404);
		return next(error);
	}
	let token;
	try {
		token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWT_KEY, {
			expiresIn: '1h',
		});
	} catch (err) {
		const error = new HttpError('Login failed, please try again');
		return next(error);
	}

	response.json({
		userId: existingUser._id,
		email: existingUser.email,
		token,
	});
};
