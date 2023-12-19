import bcrypt from 'bcrypt';

const cryptPassword = async (password) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const passHash = await bcrypt.hash(password, salt);

    return passHash;
};

const decryptPassword = async (password, passwordHash) => {
    const passwordOk = await bcrypt.compare(password, passwordHash);

    return passwordOk;
};

export { cryptPassword, decryptPassword }