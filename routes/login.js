import { Router } from "express";

import { registerView, loginView, registerUser } from "../controllers/login.js";

const router = Router();

router.get("/register", registerView);

router.get("/login", loginView);

router.post("/register", registerUser);

export default router;
