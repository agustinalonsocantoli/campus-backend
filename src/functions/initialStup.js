import Rol from '../models/rol.model.js'

export const createRoles = async () => {
    try{

        const count = await Rol.estimatedDocumentCount();

        if (count > 0) return;
    
        const values = await Promise.all([
            new Rol({name: 'student'}).save(),
            new Rol({name: 'teacher'}).save(),
            new Rol({name: 'moderador'}).save(),
            new Rol({name: 'admin'}).save()
        ])
    } catch(error) {
        console.error(error);
    }
};