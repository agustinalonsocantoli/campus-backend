import { model, Schema } from "mongoose";

export const UsersRols = [
    "admin",
    "moderador",
    "teacher",
    "student"
]

const rolSchema = new Schema({
    name: String,
},
{
    versionKey: false
});

const Rol = model('Rol', rolSchema);
export default Rol