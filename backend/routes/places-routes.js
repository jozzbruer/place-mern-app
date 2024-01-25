import express from 'express';
import validator from 'express-validator';
import fileUpload from '../middleware/file-upload.js';

import { checkAuth } from '../middleware/check-auth.js';
import {
	createPlace,
	deletePlace,
	getAllPlaces,
	getPlaceById,
	getPlacesByUserId,
	updatePlace,
} from '../controllers/places-controller.js';

const placesRoutes = express.Router();

placesRoutes.get('/', getAllPlaces);

placesRoutes.get('/:pid', getPlaceById);

placesRoutes.get('/users/:uid', getPlacesByUserId);

placesRoutes.use(checkAuth);

placesRoutes.post(
	'/',
	fileUpload.single('image'),
	[
		validator.check('title').not().isEmpty(),
		validator.check('description').isLength({ min: 5 }),
		validator.check('adress').notEmpty(),
	],
	createPlace
);

placesRoutes.patch(
	'/:pid',
	[validator.check('title').not().isEmpty(), validator.check('description').isLength({ min: 5 })],
	updatePlace
);

placesRoutes.delete('/:pid', deletePlace);

export default placesRoutes;
