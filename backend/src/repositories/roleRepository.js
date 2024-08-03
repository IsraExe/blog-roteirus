import prisma from '../utils/prisma.js';

export const createRole = async (name) => {

    const role = await prisma.role.create({
        data: {
            nm_role: name,
        },
    });

    return role;
    
};