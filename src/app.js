// Lib
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import morgan from 'morgan';
// Routes
import homeRouter from './routes/home.routes.js';
import coursesRouter from './routes/courses.routes.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';
import jobsRouter from './routes/jobs.routes.js';

// CONFIG 
dotenv.config()
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// PORT
export const PORT = process.env.PORT_KEY ? process.env.PORT_KEY : 3001

// CORS
app.use(cors());

// ROUTES
app.use('/api', homeRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/jobs', jobsRouter);

export default app;