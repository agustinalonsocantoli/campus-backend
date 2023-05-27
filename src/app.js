// Lib
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import morgan from 'morgan';
// Routes
import homeRouter from './routes/home.routes.js';
import coursesRouter from './routes/courses.routes.js';
import authRouter from './routes/auth.routes.js';
// Functions
import { createRoles } from './functions/initialStup.js';

// CONFIG 
dotenv.config()
const app = express();
createRoles();
app.use(morgan('dev'));
app.use(express.json());

// PORT
export const PORT = process.env.PORT_KEY ? process.env.PORT_KEY : 3001

// CORS
app.use(cors());

// ROUTES
// app.use('/api/login', );
app.use('/api', homeRouter);
app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);

export default app;