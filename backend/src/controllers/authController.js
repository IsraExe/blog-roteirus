
import checkAuth from '../helpers/checkAuth.js';
import { badRequestError } from '../utils/errorException.js';

const auth = async (req, res, next) => {

    const { token } = req.cookies;
    
    if (!token) return next(badRequestError('No token provided!'));
    
    await checkAuth(token);

    return res.status(200).send({ message: 'User is authenticated!' });

};

export { auth };