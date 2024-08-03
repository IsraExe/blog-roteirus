import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const createTokens = (id, email) => {

    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1d' });

    return { token };

};

export default createTokens;