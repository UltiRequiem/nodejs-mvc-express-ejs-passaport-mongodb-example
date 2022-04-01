import {env} from 'node:process';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const {DB_USER, DB_PASSWORD, CLUSTER_NAME, SUBDOMAIN, DB_NAME} = env;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.${SUBDOMAIN}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export {
	PORT,
	MONGO_URI,
	DB_USER,
	DB_PASSWORD,
	CLUSTER_NAME,
	SUBDOMAIN,
	DB_NAME,
};
