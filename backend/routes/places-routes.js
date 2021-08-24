const express = require('express')
const validator = require('express-validator')
const fileUpload = require('../middleware/file-upload')

const checkAuth = require('../middleware/check-auth')

const router = express.Router()

const placesCtrl = require('../controllers/places-controller')

router.get('/', placesCtrl.getAllPlaces)

router.get('/:pid', placesCtrl.getPlaceById)

router.get('/users/:uid', placesCtrl.getPlacesByUserId)

router.use(checkAuth)

router.post(
	'/',
	fileUpload.single('image'),
	[
		validator.check('title').not().isEmpty(),
		validator.check('description').isLength({ min: 5 }),
		validator.check('adress').notEmpty(),
	],
	placesCtrl.createPlace
)

router.patch(
	'/:pid',
	[
		validator.check('title').not().isEmpty(),
		validator.check('description').isLength({ min: 5 }),
	],
	placesCtrl.updatePlace
)

router.delete('/:pid', placesCtrl.deletePlace)

module.exports = router
