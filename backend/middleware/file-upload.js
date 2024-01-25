import multer from 'multer';
import { v4 as uuid } from 'uuid';

const MIME_TYPE_MAP = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};

const fileUpload = multer({
	limits: 500000,
	storage: multer.diskStorage({
		destination: (request, file, callback) => {
			callback(null, 'uploads/images');
		},
		filename: (request, file, callback) => {
			const extension = MIME_TYPE_MAP[file.mimetype];
			callback(null, uuid() + '.' + extension);
		},
	}),

	fileFilter: (request, file, callback) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid type of file');
		callback(error, isValid);
	},
});

export default fileUpload;
