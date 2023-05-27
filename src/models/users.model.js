import { model, Schema } from "mongoose";

const usersSchema = new Schema({
    username: { type: String, unique: true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    confirmed: Boolean,
    rol: [{ref: "Rol", type: Schema.Types.ObjectId}],
    avatarUrl: String,
    firstName: String,
    lastName: String,
    linkedin: String,
    city: String,
    country: String
},
{
    timestamps: true,
    versionKey: false
});

const Users = model('Users', usersSchema);

export default Users;