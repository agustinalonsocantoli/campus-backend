import { UsersRols } from "../models/rol.model.js";
import Users from "../models/users.model.js";

export const checkRolExisted = (req, res, next) => {
    if(req.body.rol) {
        for(let i = 0; i > req.body.rol.length; i++) {
            if(!UsersRols.includes(req.body.rol[i])) {
                return res.json({ message: "Rol does not exists", data: req.body.rol[i] })
            }
        }
    }

    next();
};

export const checkDuplicateUser = async (req, res, next) => {
    const userName = await Users.findOne({username: req.body.username})

    if(userName) return res.json({ message: "The user already exists", data: req.body.username })

    const userEmail = await Users.findOne({email: req.body.email})

    if(userEmail) return res.json({ message: "The email already exists", data: req.body.email })

    next();
};