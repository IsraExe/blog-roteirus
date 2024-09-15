import fs from 'fs';
import cron from 'node-cron';

import { EVERY_DAY_CRON } from '../config/constants.js';

const parseDateFromFilename = (filename) => {
    const [day, month, year] = filename.split('.')[0].split('-');
    return new Date(`${year}-${month}-${day}`);
};

const cleanupLogs = () => {

    const directory = './src/logs'

    const files = fs.readdirSync(directory);

    files.forEach(file => {

        const timestamp = parseDateFromFilename(file);

        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        if (timestamp < sevenDaysAgo) {
            fs.unlink(`./src/logs/${file}`, (err) => {
                if (err) console.error('Failed to delete file:', file, err);
                else console.log('Deleted file:', file);
            });
        };
    });


};

cron.schedule(EVERY_DAY_CRON, () => cleanupLogs());

export default cleanupLogs;