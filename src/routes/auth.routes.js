import express from "express";
import authController from "../controllers/auth.controller.js";
import { checkDuplicateUser } from "../middlewares/verify.signup.js";

const router = express.Router();

router.post("/login", authController.login)
router.post("/singup", [checkDuplicateUser], authController.signup)

export default router;