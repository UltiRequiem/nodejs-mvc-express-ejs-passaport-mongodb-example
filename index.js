import express, {urlencoded} from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';

import {router} from './routes/index.js';
import {loginCheck} from './auth/index.js';
import {MONGO_URI, PORT} from './config.js';

loginCheck(passport);

mongoose
	.connect(MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	});

const app = express();

app.set('view engine', 'ejs');

app.use(urlencoded({extended: false}));

app.use(
	session({
		secret: 'oneboy',
		saveUninitialized: true,
		resave: true,
	}),
);

app.use(passport.initialize());

app.use(passport.session());

app.use(router);

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`);
});
