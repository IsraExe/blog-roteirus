import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJwt = promisify(jwt.verify);

const checkAuth = async (token) => {

    const decoded = await verifyJwt(token, JWT_SECRET);

    const { id, email } = decoded;

    return { id, email };

};

export default checkAuth;
