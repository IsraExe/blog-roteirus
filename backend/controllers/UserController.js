import prisma from '../prisma/prisma.js';
import prismaClient from '@prisma/client';
import { cryptPassword } from '../helpers/passHash.js';

const { PrismaClientKnownRequestError } = prismaClient;

const create = async (req, res) => {

    const { nm_user, de_email, de_password, role } = req.body;
    
    try {

        const passwordHash = await cryptPassword(de_password);

        const newUser = await prisma.user.create({
            data: {
                nm_user: nm_user,
                email: de_email,
                password: passwordHash,
                role: {
                    create: {
                        'nm_role': role,
                    }
                },
            },
        });

        return res.status(200).send({ message: newUser });

    } catch (error) {
        console.log(error);

        if (error.code === 'P2002') return res.status(400).send({ message: 'Duplicated Email' });
        if (error instanceof PrismaClientKnownRequestError) return res.status(400).send({ message: error.message });
        console.log(error)
        return res.status(500).send({ message: error.message })
    }

}

export { create }