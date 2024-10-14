import prisma from '../lib/prisma.js';

export const showPosts = async (page) => {

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const allPosts = await prisma.post.findMany({
        take: pageSize,
        skip: skip,
        orderBy: {
            dt_created: 'desc',
        },
    });

    return allPosts;

};

export const findPostsByUserId = async (userId, page) => {

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const posts = await prisma.post.findMany({
        where: {
            id_user: Number(userId),
        },
        skip: skip,
        take: pageSize,
    });

    return posts;
    
};


export const showOne = async (id) => {

    const post = await prisma.post.findUnique({
        where: {
            id_post: Number(id)
        },
        include: {
            user: true,
        }
    });

    return post;
    
};

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

export const getTotalPostsCount = async (idUser) => {

    const totalPosts = await prisma.post.count({
        where: idUser ? { id_user: idUser } : {},
    });
    
    return totalPosts;
    
};