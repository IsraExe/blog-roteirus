import cron from 'node-cron';

import { EVERY_10MIN_CRON } from '../config/constants.js';

const maintainOnline = async () => {

    await fetch('https://www.roteirus.com.br', { method: 'GET' });

};

cron.schedule(EVERY_10MIN_CRON, () => maintainOnline());

export default maintainOnline;