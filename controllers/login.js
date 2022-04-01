import {User} from '../models/index.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';

function registerView(_request, res) {
	res.render('register', {});
}

function loginView(_request, response) {
	response.render('login', {});
}

function registerUser(
	{body: {name, email, location, password, confirm}},
	response,
) {
	if (!name || !email || !password || !confirm) {
		response.redirect('/login');
	}

	if (password !== confirm) {
		response.redirect('/login');
	}

	User.findOne({email}).then(user => {
		if (user) {
			response.render('register', {name, email, password, confirm});
		}

		const newUser = new User({name, email, location, password});

		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				throw err;
			}

			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) {
					throw err;
				}

				newUser.password = hash;

				newUser.save().then(() => response.redirect('/login'));
			});
		});
	});
}

function loginUser(request, response) {
	const {email, password} = request.body;

	if (!email || !password) {
		response.render('login', {email, password});
	}

	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true,
	})(request, response);
}

export {loginUser, loginView, registerUser, registerView};
