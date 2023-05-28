import Users from "../models/users.model.js";
import Rol from "../models/rol.model.js";
import { encryptPassword, validatePassword } from '../functions/hashUsers.js'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const authController = {

    signup: async (req, res, next) => {

        try{

            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: encryptPassword(req.body.password),
            }

            if(req.body.rol) {
                const foundRol = await Rol.find({name: {$in: req.body.rol}});
                newUser.rol = foundRol.map(rol => rol._id);
            } else {
                const foundRol = await Rol.find({name: 'student'});
                newUser.rol = foundRol.map(rol => rol._id);
            }

            const user = await Users.create(newUser)
            .catch((e) => next(e));

            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: 86400})

            res.json({
                message: "User created successfully",
                data: user,
                token: token
            })
        }
        catch(error){
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            })
        }
    },

    login: async (req, res, next) => {

        try {
            const foundUser = await Users.findOne({email: req.body.email}).populate("rol");

            if(!foundUser) return res.json({ message: "No User found", data: req.body.email });
            
            const comparePassword = validatePassword(req.body.password, foundUser.password);

            if(!comparePassword) return res.json({ message: "Invalid password", data: null });

            const token = jwt.sign({id: foundUser._id, }, process.env.SECRET_KEY, {expiresIn: 86400});

            const userLogin = foundUser;
            userLogin.password = 'No access';

            res.json({
                message: "Login successfully",
                data: userLogin,
                token: token
            })
        }
        catch(error){
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            })
        }
    }
}
    
export default authController;