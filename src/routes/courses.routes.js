import express from "express";
import coursesController from "../controllers/courses.controller.js";

const router = express.Router();

router.get('/', coursesController.getAllCourses)

router.get('/:id?', coursesController.getCourses)

router.post('/', coursesController.newCourses)

router.put('/:id', coursesController.updateCourses)

router.delete('/:id', coursesController.deleteCourses)

export default router;