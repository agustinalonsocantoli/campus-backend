import express from "express";
import coursesController from "../controllers/courses.controller.js";
import { isAdmin, isModerador, verifyToken } from "../middlewares/auth.jwt.js";

const router = express.Router();

router.get('/', [verifyToken], coursesController.getAllCourses)

router.get('/:id?', [verifyToken], coursesController.getCourses)

router.post('/', [verifyToken, isModerador], coursesController.newCourses)

router.put('/:id', [verifyToken, isModerador], coursesController.updateCourses)

router.delete('/:id', [verifyToken, isAdmin], coursesController.deleteCourses)

export default router;