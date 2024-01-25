import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { join } from 'path';
import placesRoutes from './routes/places-routes.js';
import HttpError from './models/http-error.js';
import * as dotenv from 'dotenv';
import usersRoutes from './routes/users-routes.js';

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('Connection to MongoDB success'))
	.catch(() => console.log('Connection Failed'));

const app = express();

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
app.use(express.json());

// app.use('/uploads/images', express.static(path.join(__dirname, '/uploads/images')));
app.use('/uploads/images', express.static(join('uploads', 'images')));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((request, response, next) => {
	const error = new HttpError('We cannot find this route', 404);
	return next(error);
});

app.use((error, request, response, next) => {
	if (request.file) {
		fs.unlink(request.file.path, (error) => {
			console.log(error);
		});
	}
	if (response.headerSent) {
		return next(error);
	}
	response.status(500).json({ Messages: error.message || 'An unknown error occured' });
});
export default app;
