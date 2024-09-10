import prisma from '../utils/prisma.js';

export const showPosts = async () => {
    const allPosts = await prisma.post.findMany();

    return allPosts;
};

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