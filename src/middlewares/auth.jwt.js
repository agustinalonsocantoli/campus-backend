import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";
import { dbConnection, dbEnd } from "../database.js";
import Rol from "../models/rol.model.js";
import dotenv from 'dotenv';
dotenv.config()

// export const verifyToken = async (req, res, next) => {
//     dbConnection();

//     try {
//         const token = req.headers["x-access-token"];

//         if(!token) return res.json({ message: "Unauthorized", data: null })

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.userId = decoded.id;

//         const user = await Users.findById(req.userId, { password: 0 })

//         if(!user) return res.json({ message: "No User found", data: null })

//         next();
//     }  
//     catch(error) {
//         next(error);
//         res.json({ 
//             message: "Unauthorized"
//         })
//     }

//     dbEnd();
// };

// export const isModerador = async (req, res, next) => {
//     dbConnection();

//     try {
//         const user = await Users.findById(req.userId);
//         const rol = await Rol.find({_id: {$in: user.rol}});

//         console.log(rol);
//     }
//     catch(error) {
//         next(error);
//         res.json({ 
//             message: "Unauthorized"
//         })
//     }

//     dbEnd();
// };

// export const isAdmin = async (req, res, next) => {
//     dbConnection();

//     try {

//     }
//     catch(error) {
//         next(error);
//         res.json({ 
//             message: "Unauthorized"
//         })
//     }

//     dbEnd();
// };