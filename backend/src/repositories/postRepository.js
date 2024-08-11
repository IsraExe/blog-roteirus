import prisma from '../utils/prisma.js';

export const createPost = async ({ title, content, id }) => {
    
    const newPost = await prisma.post.create({
        data: {
            nm_title: title,
            de_content: content,
            id_user: id
        }
    });

    return newPost;

};