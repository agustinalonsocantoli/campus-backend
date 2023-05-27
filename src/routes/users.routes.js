import express from "express";

import { isAdmin, isModerador, verifyToken } from "../middlewares/auth.jwt.js";
import usersController from "../controllers/users.controller.js";
import { checkDuplicateUser, checkRolExisted } from "../middlewares/verify.signup.js";

const router = express.Router();

router.get('/', [verifyToken, isAdmin], usersController.getAllUsers)

router.get('/:id?', [verifyToken, isAdmin], usersController.getUsers)

router.post('/', [verifyToken, isAdmin, checkDuplicateUser, checkRolExisted], usersController.newUsers)

router.put('/:id', [verifyToken, isAdmin ,checkRolExisted], usersController.updateUsers)

router.delete('/:id', [verifyToken, isAdmin], usersController.deleteUsers)

export default router;