const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String, required: true },
	adress: { type: String, required: true },
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // A place belongs to   1-1 user
});

module.exports = mongoose.model('Place', placeSchema);
