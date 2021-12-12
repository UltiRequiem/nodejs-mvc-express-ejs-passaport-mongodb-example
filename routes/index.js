import { Router } from "express";
import {
  registerView,
  loginView,
  registerUser,
  loginUser,
} from "../controllers/login.js";

import dashboardView from "../controllers/dashboard.js";
import protectRoute from "../auth/protect.js";

const router = Router();

router.get("/register", registerView);
router.get("/login", loginView);
router.get("/dashboard", protectRoute, dashboardView);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
