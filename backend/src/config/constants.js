export const FRONTEND_URL = process.env.FRONTEND_URL;

export const SERVER_PORT = process.env.SERVER_PORT;

export const CORS_OPTIONS = {
    origin: [`${FRONTEND_URL}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

export const SESSION_OPTIONS = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true
};

export const DB_ERROR_CODE = {
    conflict: 'P2002'
};

export const EVERY_DAY_CRON = '0 0 * * *';
export const EVERY_10MIN_CRON = '*/10 * * * *';

export const SECRET = process.env.SECRET_IMGUR;
export const CLIENTID = process.env.CLIENTID_IMGUR;
export const REFRESHTOKEN = process.env.REFRESH_TOKEN_IMGUR;