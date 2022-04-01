import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';

import {User} from '../models/index.js';

function loginCheck(passport) {
	passport.use(
		new passportLocal.Strategy(
			{usernameField: 'email'},
			(email, password, done) => {
				User.findOne({email}).then(user => {
					if (!user) {
						return done();
					}

					bcrypt.compare(password, user.password, (error, isMatch) => {
						if (error) {
							throw error;
						}

						if (isMatch) {
							return done(undefined, user);
						}

						return done();
					});
				});
			},
		),
	);

	passport.deserializeUser((id, done) => {
		User.findById(id, (error, user) => done(error, user));
	});
}

export {loginCheck};
