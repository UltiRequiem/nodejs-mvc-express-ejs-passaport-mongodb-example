import mongoose from 'mongoose';

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			default: 'New York',
		},
		date: {
			type: Date,
			default: Date.now,
		},
	}),
);

export {User};
