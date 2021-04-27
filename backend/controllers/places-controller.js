const { v4: uuidv4 } = require('uuid')
const HttpError = require('../models/http-error')
const validator = require('express-validator')

const getCoordsForAddress = require('../util/location')
const Place = require('../models/Place')

let DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State',
		description: 'The famous place',
		imageUrl:
			'https://images.unsplash.com/photo-1583842761844-be1a7bc7fc23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		adress: '20 W 34th St, New york, NY 10001',
		locations: {
			lat: 40.7484405,
			lng: -73.9878583,
		},
		creator: 'u2',
	},
	{
		id: 'p2',
		title: 'Empire Wall stree',
		description: 'The famous place',
		imageUrl:
			'https://images.unsplash.com/photo-1583842761844-be1a7bc7fc23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		adress: '20 W 34th St, New york, NY 10001',
		locations: {
			lat: 40.7484405,
			lng: -73.9878583,
		},
		creator: 'u2',
	},
]
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
exports.createPlace = (request, response, next) => {
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
		image:
			'https://images.unsplash.com/photo-1583842761844-be1a7bc7fc23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
		creator,
	})

	createPlace
		.save()
		.then(() => response.status(201).json({ places: createPlace }))
		.catch((error) => {
			error = new HttpError('Creating Place failed, Please Try again', 400)
			return next(error)
		})
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

exports.deletePlace = (request, response, next) => {
	const placeId = request.params.pid
	Place.findOne({ _id: placeId })
		.then(() => {
			Place.deleteOne({ _id: placeId })
				.then(() =>
					response.status(200).json({ Message: 'Succesfully deleted' })
				)
				.catch((error) => {
					error = new HttpError('Cant find this id', 400)
					return next(error)
				})
		})
		.catch((error) => {
			error = new HttpError("This Id does'nt exist")
			return next(error)
		})
}
