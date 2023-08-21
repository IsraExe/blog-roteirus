import prisma from '../prisma/prisma.js';
import prismaClient from '@prisma/client';
import { decryptPassword } from '../helpers/passHash.js';
const { PrismaClientKnownRequestError } = prismaClient;

const signIn = async (req, res) => {
    const { de_email, de_password } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: de_email,
            },
        });

        const passwordHash = user.password

        const checkPassword = await decryptPassword(de_password, passwordHash);

        if (!checkPassword) return res.status(401).send({ message: 'Password is incorrect' }); 

        return res.status(200).send({ message: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }

};

export { signIn };