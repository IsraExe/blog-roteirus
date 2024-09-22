import prisma from '../lib/prisma.js';

export const createUser = async (name, email, password, roleId) => {

    const user = await prisma.user.create({
        data: {
            nm_user: name,
            de_email: email,
            de_password: password,
            id_role: roleId, 
        },
        include: {
            role: true
        }
    });

    return user;
    
};


export const updateUser = async (id, name, email, password) => {

    await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            email,
            password
        },
    });

};

export const viewUsers = async () => {

    const users = await prisma.user.findMany();
  
    return users;

};

export const deleteUser = async (id) => {

    await prisma.user.delete({
        where: {
            id
        },
    });

};