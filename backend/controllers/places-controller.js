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
exports.getPlaceById = async (request, response, next) => {
	const placeId = request.params.pid

	let place
	try {
		place = await Place.findById(placeId)
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, we could not find a place',
			500
		)
		return next(error)
	}

	if (!place) {
		const error = new HttpError(
			'Could not find a place for the provided ID',
			404
		)
		return next(error)
	}
	response.json({ place })
}

exports.getPlacesByUserId = async (request, response, next) => {
	const userId = request.params.uid

	let places

	try {
		places = await Place.find({ creator: userId })
	} catch (err) {
		const error = new HttpError(
			'Fetching places failed, please try aigain later.',
			500
		)
		return next(error)
	}

	if (!places) {
		const error = new HttpError(
			'Could not find a places for the provided user ID',
			404
		)
		return next(error)
	}
	response.json({ places })
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

exports.updatePlace = async (request, response, next) => {
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

	let place
	try {
		place = await Place.findById(placeId)
	} catch (error) {
		error = new HttpError(
			'Somthing went wrong, could not update the place.',
			500
		)
		return next(error)
	}

	if (place.creator.toString() !== request.userData.userId) {
		const error = new HttpError(
			'Somthing went wrong, could not update the place.',
			401
		)
		return next(error)
	}

	place.title = title
	place.description = description

	try {
		await place.save()
	} catch (error) {
		error = new HttpError('You are not allowed to edit this place.', 500)
		return next(error)
	}

	response.status(201).json({ Message: 'Successfully Update' })
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
