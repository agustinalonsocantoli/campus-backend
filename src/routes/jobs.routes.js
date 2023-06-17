import express from "express";
import jobsController from "../controllers/jobs.controller.js";
import { isAdmin, isModerador, verifyToken } from "../middlewares/auth.jwt.js";

const router = express.Router();

router.get('/', [verifyToken], jobsController.getAllJobs)

router.get('/:id?', [verifyToken], jobsController.getJobs)

router.post('/', [verifyToken, isModerador], jobsController.newJobs)

router.put('/:id', [verifyToken, isModerador], jobsController.updateJobs)

router.delete('/:id', [verifyToken, isAdmin], jobsController.deleteJobs)

export default router;