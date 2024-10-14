import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import verifyReqFields from '../utils/verifyReqFields.js';
import { badRequestError, unauthorizedError } from '../utils/errorException.js';
import { createUser, updateUser, viewUsers, deleteUser, findUserById } from '../repositories/userRepository.js';
import { findPostsByUserId, getTotalPostsCount } from '../repositories/postRepository.js';
import cookiesOptions from '../helpers/cookiesOptions.js';
import createTokens from '../helpers/createTokens.js';

export const read = async (req, res, next) => {
    
    const users = await viewUsers();

    return res.status(200).send({ message: users });

};

export const getUser = async (req, res, next) => {

    const { id } = req.metadata;
    const { page } = req.query;

    const user = await findUserById(id);
    const postsByUser = await findPostsByUserId(id, page);
    const totalPostsByUser = await getTotalPostsCount(id);

    return res.status(200).send({ data: {...user, posts: postsByUser, totalPosts: totalPostsByUser } });

};

export const create = async (req, res, next) => {

    const { name, email, password } = req.body;

    verifyReqFields({ requiredFields: ['name', 'email', 'password'], fields: req.body });

    const encryptedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, encryptedPassword);

    return res.status(201).send({ message: 'User created' });

};

export const update = async (req, res, next) => {

    const { id } = req.metadata;
    const { name, email, password } = req.body;

    verifyReqFields({requiredFields: ['name', 'email', 'password'], fields: req.body});

    const encryptedPassword = await bcrypt.hash(password, 10);

    await updateUser(id, name, email, encryptedPassword);
    
    return res.status(200).send({ message: 'User updated' });

};

export const exclude = async (req, res, next) => {

    const { id } = req.metadata;

    await deleteUser(id);

    const host = req.hostname;
    const domain = host === 'localhost' ? host : host.slice(host.indexOf('.'), host.length);

    res.clearCookie('token', { domain });

    return res.status(204).send({ message: 'User deleted' });

};

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    const host = req.hostname;

    const cookieOptions = cookiesOptions(host);

    if (!email || !password) return next(badRequestError('Email and/or password is missing'));

    const user = await prisma.user.findUnique({ where: { de_email: email } });

    if (!user) return next(unauthorizedError('User and/or password invalid'));

    const isValidPassword = await bcrypt.compare(password, user.de_password);
    if (!isValidPassword) return next(unauthorizedError('User and/or password invalid'));   

    const { token } = createTokens(user.id_user);

    const { password: removePassFromUserInfo, ...userDetails } = user;

    res.cookie('token', token, cookieOptions);

    return res.status(200).send({ message: 'Login successfully', user: userDetails, token });

};

export const logout = async (req, res, next) => {

    const host = req.hostname;
    const domain = host === 'localhost' ? host : host.slice(host.indexOf('.'), host.length);

    res.clearCookie('token', { domain });

    return res.status(200).send({ message: 'Cookies cleared. Logout successfully' });

};