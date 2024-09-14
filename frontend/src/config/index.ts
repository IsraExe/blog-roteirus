export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const PUBLIC_URLS = {
    static: [
        '/',
        '/signIn',
        '/signUp',
    ],
    dynamic: [
        '/post'
    ]
};

export const SECRET_IMGUR = process.env.SECRET_IMGUR;
export const CLIENTID_IMGUR = process.env.CLIENTID_IMGUR;
export const REFRESH_TOKEN_IMGUR = process.env.REFRESH_TOKEN_IMGUR;