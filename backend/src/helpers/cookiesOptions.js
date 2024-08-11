const cookiesOptions = (host) => {

    const domain = host === 'localhost' ? host : host.slice(host.indexOf('.'), host.length);
    const secure = host === 'localhost' ? false : true;

    const oneDay = 1000 * 60 * 60 * 24;
    const cookieOptions = {
        httpOnly: true,
        domain,
        sameSite: 'Strict',
        secure,
        maxAge: oneDay
    };

    return cookieOptions;

};

export default cookiesOptions;