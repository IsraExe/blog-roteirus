import prisma from '../prisma/prisma.js';
import prismaClient from '@prisma/client';
const { PrismaClientKnownRequestError } = prismaClient;
import { cryptPassword } from '../helpers/passHash.js';

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
        if (error instanceof PrismaClientKnownRequestError) return res.status(400).send({ message: error.message });
       console.log(error)
        return res.status(500).send({ message: error.message })
    }

}

export { create }