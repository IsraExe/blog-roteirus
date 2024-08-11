import prisma from '../../prisma/prisma.js';
import prismaClient from '@prisma/client';
const { PrismaClientKnownRequestError } = prismaClient;

const create = async (req, res) => {

    const { title, content } = req.body;

    console.log(title, content)

    console.log(req.metadata)

    try {
        // const newUser = await prisma.user.create({
        //     data: {
        //         nm_user: 'John Doe5',
        //         desc_user: 'First user',
        //         email: 'joh8@example.com',
        //         password: '123456',
        //         role: {
        //             create: {
        //                 'nm_role': 'User',
        //             }
        //         },
        //         post: {
        //             create: {
        //                 title: 'First post',
        //                 content: 'Content of the first post',
        //             }
        //         }
        //     },
        // })

        // console.log(newUser);

        // const allUsers = await prisma.user.findMany();
        // console.dir(allUsers);

        return res.status(200).send({ message: 'Created!' })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) return res.status(400).send({ message: error.message });
       
        return res.status(500).send({ message: 'Server internal error!' })

    }


}

export { create }