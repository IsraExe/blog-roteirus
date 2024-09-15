import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import limiter from './middlewares/limiter.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import postRoutes from './routes/postRoutes.js';

import { SERVER_PORT, CORS_OPTIONS } from './config/constants.js';

import './scripts/clearLogs.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use(logger);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/post', postRoutes);

app.use((req, res) => res.status(404).send({ error: 'Not found route' }));

app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));