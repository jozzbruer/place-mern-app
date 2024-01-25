import validator from 'express-validator';
import mongoose from 'mongoose';
import fs from 'fs';

//const getCoordsForAddress = require('../util/location');
import Place from '../models/place.js';
import User from '../models/user.js';
import HttpError from '../models/http-error.js';

export const getAllPlaces = (request, response, next) => {
	Place.find()
		.then((places) => response.status(200).json({ places }))
		.catch((error) => {
			error = new HttpError('The database is empty', 404);
			return next(error);
		});
};
export const getPlaceById = async (request, response, next) => {
	const placeId = request.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError('Something went wrong, we could not find a place', 500);
		return next(error);
	}

	if (!place) {
		const error = new HttpError('Could not find a place for the provided ID', 404);
		return next(error);
	}
	response.json({ place });
};

export const getPlacesByUserId = async (request, response, next) => {
	const userId = request.params.uid;

	let places;

	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		const error = new HttpError('Fetching places failed, please try aigain later.', 500);
		return next(error);
	}

	if (!places) {
		const error = new HttpError('Could not find a places for the provided user ID', 404);
		return next(error);
	}
	response.json({ places });
};
export const createPlace = async (request, response, next) => {
	const errors = validator.validationResult(request);

	if (!errors.isEmpty()) {
		const error = new HttpError('Invalid input passes, please check your data', 422);
		return next(error);
	}
	const { title, description, adress, creator } = request.body; // const title = request.body.title
	let coordinates;
	try {
		coordinates = getCoordsForAddress(adress);
	} catch (error) {
		return next(error);
	}

	const createPlace = new Place({
		title,
		description,
		adress,
		location: coordinates,
		image: request.file.path,
		creator,
	});
	let user;
	try {
		user = await User.findById(creator);
	} catch (error) {
		error = new HttpError('Creating Place Failed', 500);
		return next(error);
	}
	if (!user) {
		const error = new HttpError('We could not find user for this ID', 404);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createPlace.save({ session: sess });
		user.places.push(createPlace);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		error = new HttpError('Creating Place Failed, Please try again', 500);
		return next(error);
	}

	response.status(201).json({ place: createPlace });
};

export const updatePlace = async (request, response, next) => {
	const { title, description } = request.body; // const title = request.body.title
	const errors = validator.validationResult(request);

	if (!errors.isEmpty()) {
		const error = new HttpError('Invalid input passes, please check your data', 422);
		return next(error);
	}
	const placeId = request.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (error) {
		error = new HttpError('Somthing went wrong, could not update the place.', 500);
		return next(error);
	}

	if (place.creator.toString() !== request.userData.userId) {
		const error = new HttpError('Something went wrong, could not update the place.', 401);
		return next(error);
	}

	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (error) {
		error = new HttpError('You are not allowed to edit this place.', 500);
		return next(error);
	}

	response.status(201).json({ Message: 'Successfully Update' });
};

export const deletePlace = async (request, response, next) => {
	const placeId = request.params.pid;

	let place;

	try {
		place = await Place.findById(placeId).populate('creator');
	} catch (error) {
		error = new HttpError('Something went wrong, could not delete the place', 500);
		return next(error);
	}

	if (!place) {
		const error = new HttpError('We could not find place for this ID', 404);
		return next(error);
	}

	if (place.creator.id !== request.userData.userId) {
		const error = new HttpError('Something went wrong, could not update the place.', 401);
		return next(error);
	}

	const imagePath = place.image;
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await place.remove({ session: sess });
		place.creator.places.pull(place);
		await place.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (error) {
		error = new HttpError('Something went wrong, could not delete the place', 500);
		return next(error);
	}
	fs.unlink(imagePath, (error) => {
		console.log(error);
	});
	response.status(200).json({ Message: 'Place deleted!' });
};
