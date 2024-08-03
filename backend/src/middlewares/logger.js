import writeLogFile from '../utils/writeLogFile.js';

const logger = (req, res, next) => {

    res.on('finish', () => {
        if (res.statusCode >= 400) return;
        writeLogFile(req, res);
    });

    next();

};

export default logger;