import prisma from '../lib/prisma.js';
import { badRequestError } from '../utils/errorException.js';
import { FRONTEND_URL } from '../config/constants.js';
import { createUser } from '../repositories/userRepository.js';
import checkAuth from '../helpers/checkAuth.js';
import cookiesOptions from '../helpers/cookiesOptions.js';
import createTokens from '../helpers/createTokens.js';

const auth = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(badRequestError('No token provided!'));

    await checkAuth(token);

    return res.status(200).send({ message: 'User is authenticated!' });

};

const google = async (req, res) => {

    const userGoogle = req.user;

    const host = req.hostname;

    const cookieOptions = cookiesOptions(host);

    const name = userGoogle.displayName;
    const email = userGoogle.emails?.[0]?.value;

    const user = await prisma.user.findUnique({ where: { de_email: email } }) || await createUser({ name, email, provider: 'google' });

    const { token } = createTokens(user.id_user);

    res.cookie('token', token, cookieOptions);

    res.redirect(`${FRONTEND_URL}`); 

};

export { auth, google };