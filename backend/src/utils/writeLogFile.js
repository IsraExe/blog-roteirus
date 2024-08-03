import fs from 'fs';
import { formatInTimeZone } from 'date-fns-tz';

const writeLogFile = (req, res, error) => {

    const timestamp = Date.now();
    const hour = formatInTimeZone(timestamp, 'America/Sao_Paulo', "HH'h':mm'm'");
    const formattedDateTime = formatInTimeZone(timestamp, 'America/Sao_Paulo', 'dd-MM-yyyy');
    const logFilePath = `./src/logs/${formattedDateTime}.log`;

    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
    const fileExists = fs.existsSync(logFilePath);
    if (!fileExists) logStream.write('method | login | url | request body | status code | error | hour \n');

    const { password, ...requestBodyInfo } = req.body;

    const reqBodyChangePass = password ? {
        ...requestBodyInfo,
        password: '**********'
    } : requestBodyInfo;

    const requestDetails = `${req.method} | ${req.params?.user} | ${decodeURI(req.originalUrl)} | ${JSON.stringify(reqBodyChangePass)} | ${error?.statusCode || res.statusCode} | ${error} | ${hour} \n`;

    const compressedQuery = requestDetails.replace(/\n\s*/g, ' ');

    logStream.write(`${compressedQuery} \n`);
    logStream.end();

};

export default writeLogFile;
