import checkAuth from '../helpers/checkAuth.js';
import { badRequestError } from '../utils/errorException.js';

const auth = async (req, res, next) => {

    const tokenLocalStorage = req.headers['authorization'];

    const { token } = req.cookies;

    if (!token && !tokenLocalStorage) return next(badRequestError('No token provided'));

    const tokenRecieved = token || tokenLocalStorage;
    
    const { email, id } = await checkAuth(tokenRecieved);

    req.metadata = { email, id };

    return next();

};

export default auth;