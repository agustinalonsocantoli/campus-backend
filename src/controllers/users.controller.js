import { encryptPassword } from "../functions/hashUsers.js";
import Rol from "../models/rol.model.js";
import Users from "../models/users.model.js";

const usersController = {

    getAllUsers: async (req, res, next) => {
        
        try {
            
            const users = await Users.find().populate("rol")
            .exec()
            .catch((e) => next(e));

            let usersView = [];
            for(let i = 0; i < users.length; i++) {
                let userClean = users[i];
                userClean.password = 'No access';

                usersView.push(userClean)
            }

            res.json({
                message: "Users obtained successfully", 
                data: usersView
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    getUsers: async (req, res, next) => {
        
        try {    

            const user = await Users.findOne({_id: req.params.id}).populate("rol")
            .exec()
            .catch((e) => next(e));

            const userView = user;
            userView.password = 'No access';
    
            res.json({
                message: "User obtained successfully",
                data: userView
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    newUsers: async (req, res, next) => {

        try {
    
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: encryptPassword(req.body.password),
                confirmed: req.body.confirmed,
                rol: req.body.rol,
                avatarUrl: req.body.avatarUrl,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                linkedin: req.body.linkedin,
                city: req.body.city,
                country: req.body.country
            }

            if(req.body.rol) {
                const foundRol = await Rol.find({name: {$in: req.body.rol}});
                newUser.rol = foundRol.map(rol => rol._id);
            } else {
                const foundRol = await Rol.find({name: 'student'});

                newUser.rol = foundRol.map(rol => rol._id);
            }
    
            await Users.create(newUser)
            .catch((e) => next(e));

            const userView = newUser;
            userView.password = 'No access';
    
            res.json({
                message: "User created successfully",
                data: userView
            })

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    updateUsers: async (req, res, next) => {

        try {

            
            const editUser = {
                username: req.body.username,
                email: req.body.email,
                password: encryptPassword(req.body.password),
                confirmed: req.body.confirmed,
                avatarUrl: req.body.avatarUrl,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                linkedin: req.body.linkedin,
                city: req.body.city,
                country: req.body.country
            }

            if(req.body.rol) {
                const foundRol = await Rol.find({name: {$in: req.body.rol}});
                editUser.rol = foundRol.map(rol => rol._id);
            }
            
            await Users.findOneAndUpdate({_id: req.params.id}, editUser)
            .catch((e) => next(e));

            const userView = editUser;
            userView.password = 'No access';

            res.json({
                message: `User update successfully`,
                data: userView
            })
        
        } catch(error) {
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    deleteUsers: async (req, res, next) => {

        try {
            await Users.findOneAndDelete({_id: req.params.id})
            .exec()
            .catch((e) => next(e));

            res.json({
                message: `User deleted successfully`,
                data: req.params.id
            })

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
}

export default usersController;