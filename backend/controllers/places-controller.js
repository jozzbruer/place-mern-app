const { v4: uuidv4 } = require('uuid')
const HttpError = require('../models/http-error')
const validator = require('express-validator')
const mongoose = require('mongoose')
const fs = require('fs')

const getCoordsForAddress = require('../util/location')
const Place = require('../models/Place')
const User = require('../models/User')

exports.getAllPlaces = (request, response, next) => {
	Place.find()
		.then((places) => response.status(200).json({ places }))
		.catch((error) => {
			error = new HttpError('The database is empty', 404)
			return next(error)
		})
}
exports.getPlaceById = (request, response, next) => {
	const placeId = request.params.pid
	Place.findOne({ _id: placeId })
		.then((place) => response.status(200).json({ place }))
		.catch((error) => {
			error = new HttpError("We could'nt find a place for the provided ID", 404)
			return next(error)
		})
}

exports.getPlacesByUserId = (request, response, next) => {
	const userId = request.params.uid
	Place.find({ creator: userId })
		.then((places) => response.status(200).json({ places }))
		.catch((error) => {
			error = new HttpError("We could'nt find place for this user ID", 400)
			return next(error)
		})
}
exports.createPlace = async (request, response, next) => {
	const errors = validator.validationResult(request)

	if (!errors.isEmpty()) {
		const error = new HttpError(
			'Invalid input passes, please check your data',
			422
		)
		return next(error)
	}
	const { title, description, adress, creator } = request.body // const title = request.body.title
	let coordinates
	try {
		coordinates = getCoordsForAddress(adress)
	} catch (error) {
		return next(error)
	}

	const createPlace = new Place({
		title,
		description,
		adress,
		location: coordinates,
		image: request.file.path,
		creator,
	})
	let user
	try {
		user = await User.findById(creator)
	} catch (error) {
		error = new HttpError('Creating Place Failed', 500)
		return next(error)
	}
	if (!user) {
		const error = new HttpError('We could not find user for this ID', 404)
		return next(error)
	}

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await createPlace.save({ session: sess })
		user.places.push(createPlace)
		await user.save({ session: sess })
		await sess.commitTransaction()
	} catch (error) {
		error = new HttpError('Creating Place Failed, Please try again', 500)
		return next(error)
	}

	response.status(201).json({ place: createPlace })
}

exports.updatePlace = (request, response, next) => {
	const { title, description } = request.body // const title = request.body.title
	const errors = validator.validationResult(request)

	if (!errors.isEmpty()) {
		const error = new HttpError(
			'Invalid input passes, please check your data',
			422
		)
		return next(error)
	}
	const placeId = request.params.pid
	Place.updateOne({ _id: placeId }, { title, description, _id: placeId })
		.then(() => response.status(201).json({ Message: 'Succesfully update' }))
		.catch((error) => {
			error = new HttpError('cant update this', 500)
			return next(error)
		})

	// Update the field from the body
	// updatePlace.title = title
	// updatePlace.description = description

	// DUMMY_PLACES[placeIndex] = updatePlace
	// response.status(200)
	// response.json({ place: updatePlace })
}

exports.deletePlace = async (request, response, next) => {
	const placeId = request.params.pid

	let place

	try {
		place = await Place.findById(placeId).populate('creator')
	} catch (error) {
		error = new HttpError(
			'Something went wrong, could not delete the place',
			500
		)
		return next(error)
	}

	if (!place) {
		const error = new HttpError('We could not find place for this ID', 404)
		return next(error)
	}

	const imagePath = place.image
	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await place.remove({ session: sess })
		place.creator.places.pull(place)
		await place.creator.save({ session: sess })
		await sess.commitTransaction()
	} catch (error) {
		error = new HttpError(
			'Something went wrong, could not delete the place',
			500
		)
		return next(error)
	}
	fs.unlink(imagePath, (error) => {
		console.log(error)
	})
	response.status(200).json({ Message: 'Place deleted!' })
}
