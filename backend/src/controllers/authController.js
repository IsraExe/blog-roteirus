
import checkAuth from '../helpers/checkAuth.js';
import { badRequestError } from '../utils/errorException.js';

const auth = async (req, res, next) => {
    const tokenLocalStorage = req.headers['authorization'];

    const { token } = req.cookies;
    
    if (!token && !tokenLocalStorage) return next(badRequestError('No token provided!'));

    const tokenRecieved = token || tokenLocalStorage;
    
    await checkAuth(tokenRecieved);

    return res.status(200).send({ message: 'User is authenticated!' });

};

export { auth };