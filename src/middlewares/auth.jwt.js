import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";
import Rol from "../models/rol.model.js";
import dotenv from 'dotenv';
dotenv.config()

export const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"];

        if(!token) return res.json({ message: "Unauthorized" })

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        const user = await Users.findById(req.userId, { password: 0 })

        if(!user) return res.json({ message: "No User found", data: null })

        next();
    }  
    catch(error) {
        next(error);
        res.json({ 
            message: "a"
        })
    }

};

export const isModerador = async (req, res, next) => {

    try {
        const user = await Users.findById(req.userId);
        const roles = await Rol.find({_id: {$in: user.rol}});

        for(let i = 0; i < roles.length; i++) {
            if(roles[i].name === "moderador") {
                next();
                return;
            }
        }

        return res.json({
            message: "Unauthorized, require moderator rol"
        })
    }
    catch(error) {
        next(error);
        res.json({ 
            message: "Unauthorized"
        })
    }
};

export const isAdmin = async (req, res, next) => {

    try {
        const user = await Users.findById(req.userId);
        const roles = await Rol.find({_id: {$in: user.rol}});

        for(let i = 0; i < roles.length; i++) {
            if(roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.json({
            message: "Unauthorized, require admin rol"
        })
    }
    catch(error) {
        next(error);
        res.json({ 
            message: "Unauthorized"
        })
    }

};