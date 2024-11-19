import prisma from '../lib/prisma.js';

const dbDisconnect = (_, res, next) => {

    res.on('finish', async () => await prisma.$disconnect());

    next();

};

export default dbDisconnect;