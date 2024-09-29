import { ImgurClient } from 'imgur';
import errorException from '../utils/errorException.js';
import { createPost, excludePost, showPosts, showOne, editPost } from '../repositories/postRepository.js';
import { SECRET, CLIENTID, REFRESHTOKEN } from '../config/constants.js';

export { showPosts };

export const showOnePost = async (id) => {
    const post = await showOne(id);

    return post;
};

export const addPost = async ({ id, title, content, coverImage }) => {

    const regex = /data:image\/(png|jpe?g|gif);base64,([^"]*)/gi;
    const base64Image = regex.exec(coverImage);
    const coverImageAsLink = await generateImageLinks([base64Image[2]]);

    const { updatedContent, extractedImages } = await extractImages(content);
    const imageLinks = await generateImageLinks(extractedImages);
    const finalContent = replaceImagesWithLinks(updatedContent, imageLinks);

    await createPost({ title, content: finalContent, id, coverImage: coverImageAsLink[0] });

};

export const updatePost = async ({ id, title, content, coverImage }) => {

    const regex = /data:image\/(png|jpe?g|gif);base64,([^"]*)/gi;
    const base64Image = regex.exec(coverImage);
    const coverImageAsLink = await generateImageLinks([base64Image[2]]);

    const { updatedContent, extractedImages } = await extractImages(content);
    const imageLinks = await generateImageLinks(extractedImages);
    const finalContent = replaceImagesWithLinks(updatedContent, imageLinks);

    await editPost({ title, content: finalContent, id, coverImage: coverImageAsLink[0] });

};

export const deletePost = async (id) => await excludePost(id);

const extractImages = async (content) => {

    const regex = /src="data:image\/(png|jpe?g|gif);base64,([^"]*)"/gi;
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        matches.push({ extractedValue: match[2] });
    };

    if (matches.length === 0) return { updatedContent: content, extractedImages: [] };

    const extractedImages = matches.map(({ extractedValue }) => extractedValue);

    return { updatedContent: content, extractedImages };

};

const generateImageLinks  = async (imageBuffers) => {

    const client = new ImgurClient({
        clientId: CLIENTID,
        clientSecret: SECRET,
        refreshToken: REFRESHTOKEN,
    });

    const imageLinks = await Promise.all(imageBuffers.map(async (imageBuffer) => {
        const response = await client.upload({
            image: imageBuffer.toString('base64'),
            type: 'base64', 
        });

        if (response.status !== 200) throw errorException(response.status, 'Erro ao transformar as imagens em links!')

        return response.data.link;
    }));

    return imageLinks;

};

const replaceImagesWithLinks  = (content, imageLinks) => {

    const regex = /src="data:image\/(png|jpe?g|gif);base64,([^"]*)"/gi;
    let updatedContent = content;
    let index = 0;

    updatedContent = updatedContent.replace(regex, () => {
        const srcUrl = `src="${imageLinks[index]}"`;
        index++;
        return srcUrl;
    });

    return updatedContent;

};