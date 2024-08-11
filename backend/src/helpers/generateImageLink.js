import { ImgurClient } from 'imgur';

const SECRET = process.env.SECRET_IMGUR;
const CLIENTID = process.env.CLIENTID_IMGUR;
const REFRESHTOKEN = process.env.REFRESH_TOKEN_IMGUR;

const generateImageUrl = async (imageBuffer) => {

    const client = new ImgurClient({ clientId: SECRET, clientSecret: CLIENTID, refreshToken: REFRESHTOKEN });

    const response = await client.upload({
        image: imageBuffer,
        type: 'base64',
    });

    if (response.status !== 200) {
        const error = new Error('Erro ao transformar as imagens em links!');
        error.name = 'ImgurImageLink';
        throw error;
    };

    const imageLink = response.data.link;

    return imageLink;
};

export default generateImageUrl;

// const extractImages = () => {
//     const regex = /<img src="([^"]+)"/g;
//     //@ts-ignore
//     const matches = [...content.matchAll(regex)];

//     const imageSources = matches.map(match => match[1]);
//     // console.log(imageSources[0])
//     const base64Image = Buffer.from(imageSources[0], 'base64');
//     console.log(base64Image)
//     generateImageUrl({ imageBuffer: base64Image });
//     return imageSources;
//   };

//   const imageSources = extractImages();

//   console.log(imageSources)