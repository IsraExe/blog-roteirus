import writeLogFile from '../utils/writeLogFile.js';
import { DB_ERROR_CODE } from '../config/constants.js';

const errorHandler = async (error, req, res, next) => {

    res.on('finish', () => writeLogFile(req, res, error));

    if (error.code === DB_ERROR_CODE.conflict) return res.status(409).send({ error: `The ${error.meta.target} already exists!` });

    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') return res.status(401).send({ error: 'Invalid token' });
    
    const statusCode = error?.statusCode || 500;
    const messageError = error?.statusCode ? error?.message : 'Server internal error';

    return res.status(statusCode).send({ error: messageError });

};

export default errorHandler;