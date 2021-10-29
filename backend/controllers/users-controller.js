const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const validator = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.getAllUsers = async (request, response, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError(
			'Fetching users failed, please try again later.',
			500
		);
		return next(error);
	}
	response.status(200).json({ users });
};

exports.signUp = (request, response, next) => {
	const errors = validator.validationResult(request);

	if (!errors.isEmpty()) {
		const error = new HttpError(
			'Invalid input passes, please check your data',
			422
		);
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
			const error = new HttpError(
				'Signing up failed, please try aigain later',
				500
			);
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
					const error = new HttpError(
						'Failed signing up, please contact the comapny',
						500
					);
					return next(error);
				});
		})
		.catch((err) => {
			const error = new HttpError('Encryption failed', 501);
			return next(error);
		});
};

exports.login = async (request, response, next) => {
	const { email, password } = request.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			'Loggin in failed, please try again later.',
			500
		);
		return next(error);
	}

	if (!existingUser) {
		const error = new HttpError(
			'Invalid credentials, could not log you in.',
			401
		);
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
		token = jwt.sign(
			{ userId: existingUser._id, email: existingUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '1h' }
		);
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
