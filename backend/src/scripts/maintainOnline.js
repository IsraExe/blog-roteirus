import cron from 'node-cron';

import { EVERY_10MIN_CRON } from '../config/constants.js';

const maintainOnline = async () => {

    const response = await fetch('https://www.roteirus.com.br', { method: 'GET' });
    const response2 = await fetch('https://api.roteirus.com.br', { method: 'GET' });

    // console.log(response, response2);

};

cron.schedule(EVERY_10MIN_CRON, () => maintainOnline());

export default maintainOnline;