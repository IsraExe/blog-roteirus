import prisma from '../lib/prisma.js';

export const showPosts = async () => {

    const allPosts = await prisma.post.findMany();

    return allPosts;

};

export const showOne = async (id) => {

    const post = await prisma.post.findUnique({
        where: {
            id_post: Number(id)
        }
    });

    return post;
}

export const createPost = async ({ title, content, id, coverImage }) => {
    
    const newPost = await prisma.post.create({
        data: {
            nm_title: title,
            de_content: content,
            id_user: id,
            cover_image: coverImage
        }
    });

    return newPost;

};

export const editPost = async ({ title, content, id, coverImage }) => {
    
    const newPost = await prisma.post.update({
        where: {
            id_post: Number(id) 
        },
        data: {
            nm_title: title,
            de_content: content,
            cover_image: coverImage
        }
    });

    return newPost;

};

export const excludePost = async (id) => {

    await prisma.post.delete({
        where: {
            id_post: id
        }
    })

};