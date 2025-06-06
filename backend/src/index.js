import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';

import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import limiter from './middlewares/limiter.js';
import dbDisconnect from './middlewares/dbDisconnect.js';

import { userRoutes } from './routes/userRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { roleRoutes } from './routes/roleRoutes.js';
import { postRoutes } from './routes/postRoutes.js';

import { SERVER_PORT, CORS_OPTIONS, SESSION_OPTIONS } from './config/constants.js';

import './scripts/clearLogs.js';
import './scripts/maintainOnline.js';

const app = express();

app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use(logger);
app.use(dbDisconnect);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/post', postRoutes);

app.use((req, res) => res.status(404).send({ error: 'Not found route' }));

app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));