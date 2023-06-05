import prisma from '../prisma/prisma.js';

const create = async (req, res) => {
    console.log('pelo menos chegou aqui')
    const newUser = await prisma.user.create({
        data: {
            nm_user: 'John Doe5',
            desc_user: 'First user',
            email: 'joh7@example.com',
            password: '123456',
            role: {
                create: {
                    'nm_role': 'User',
                }
            },
            post: {
                create: {
                    title: 'First post',
                    content: 'Content of the first post',
                }
            } 
        },
    })

    console.log(newUser);

    const allUsers = await prisma.user.findMany();
    console.dir(allUsers);

    return res.status(200).send({ message: 'Created!' })
}

export { create }