import generateImageLink from '../helpers/generateImageLink.js';
import { createPost, excludePost, showPosts, showOne } from '../repositories/postRepository.js';

export const showAll = async (req, res) => {
    const allPosts = await showPosts();

    return res.status(200).send({ message: allPosts });
};

export const getOne = async (req, res) => {
    const { id } = req.params;

    const post = await showOne(id);

    return res.status(200).send({ data: post })
};

export const create = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.metadata;

    const extractImages = async (content) => {
        if (!content) {
            console.error('No content provided');
            return '';
        };

        const regex = /src="data:image\/(png|jpe?g|gif);base64,([^"]*)"/gi;
        const matches = [];
        let match;

        while ((match = regex.exec(content)) !== null) {
            matches.push({ match: match[0], extractedValue: match[2] });
        }

        if (matches.length === 0) return content;

        const imageLinks = await Promise.all(matches.map(async ({ extractedValue }) => {
            const imageBuffer = Buffer.from(extractedValue, 'base64');
            const link = await generateImageLink(imageBuffer);
            console.log('Generated link:', link);
            return link;
        }));

        let updatedContent = content;
        matches.forEach((match, index) => {
            const srcUrl = `src="${imageLinks[index]}"`;
            updatedContent = updatedContent.replace(match.match, srcUrl);
        });

        return updatedContent;
    };

    const updatedContent = await extractImages(content);

    await createPost({ title, content: updatedContent, id });

    return res.status(200).send({ message: 'Created!' });

};

export const exclude = (req, res) => {
    const { id } = req.query; 
    
    excludePost(id);

    return res.status(204).send();
};