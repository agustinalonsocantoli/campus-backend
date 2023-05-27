import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URL === undefined ? '' : process.env.MONGODB_URL;

export async function dbConnection() {
    await mongoose.connect(url)
    .then(() => {
        console.log('Database Connect');
    })
    .catch(error => 
        console.log(error)
    );
}

export async function dbEnd() {
    await mongoose.disconnect()
    .then(() => {
        console.log('Database Disconnect');
    })
    .catch(error => 
        console.log(error)
    );
}