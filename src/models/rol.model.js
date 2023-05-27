import { model, Schema } from "mongoose";

const rolSchema = new Schema({
    name: String,
},
{
    versionKey: false
});

const Rol = model('Rol', rolSchema);
export default Rol