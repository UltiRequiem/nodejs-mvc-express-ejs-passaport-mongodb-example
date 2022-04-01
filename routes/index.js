import {Router} from 'express';

import {
	dashboardView,
	loginUser,
	loginView,
	registerUser,
	registerView,
} from '../controllers/index.js';
import {protectRoute} from '../auth/index.js';

const router = new Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', protectRoute, dashboardView);

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
