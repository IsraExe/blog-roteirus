import prisma from '../prisma/prisma.js';
import prismaClient from '@prisma/client';
const { PrismaClientKnownRequestError } = prismaClient;
import { cryptPassword } from '../helpers/passHash.js';

const Login = (req, res) => {
    const { login, password } = req.body;

    
};


