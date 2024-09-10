import { ImgurClient } from 'imgur';

const SECRET = process.env.SECRET_IMGUR;
const CLIENTID = process.env.CLIENTID_IMGUR;
const REFRESHTOKEN = process.env.REFRESH_TOKEN_IMGUR;

const generateImageLink = async (imageBuffer) => {

    const client = new ImgurClient({
        clientId: CLIENTID,
        clientSecret: SECRET,
        // refreshToken: REFRESHTOKEN,
    });

    console.log({ CLIENTID, SECRET, REFRESHTOKEN })

    console.log(imageBuffer)

    const response = await client.upload({
        image: imageBuffer.toString('base64'),
        type: 'base64', 
    });

    if (response.status !== 200) throw errorException(response.status, 'Erro ao transformar as imagens em links!')

    const imageLink = response.data.link;

    return imageLink;
};

export default generateImageLink;
