import express from 'express';
import validator from 'express-validator';
import fileUpload from '../middleware/file-upload.js';
import { getAllUsers, login, signUp } from '../controllers/users-controller.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.post(
	'/signup',
	fileUpload.single('image'),
	[
		validator.check('name').notEmpty(),
		validator.check('email').isEmail(),
		validator.check('password').isLength({ min: 6 }),
	],
	signUp
);
usersRoutes.post('/login', login);

export default usersRoutes;
