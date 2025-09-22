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
        orderBy: {
            dt_created: 'desc',
        },
        skip: skip,
        take: pageSize,
    });

    return posts;

};

export const showOne = async (slug) => {

    const post = await prisma.post.findFirst({
        where: {
            OR: [
                { slug },
                { old_slugs: { some: { old_slug: slug } } }
            ]
        },
        include: {
            user: true,
            old_slugs: true 
        }
    });

    return post;

};

export const createPost = async ({ title, content, id, coverImage, slug }) => {

    const newPost = await prisma.post.create({
        data: {
            nm_title: title,
            de_content: content,
            id_user: id,
            cover_image: coverImage,
            slug
        }
    });

    return newPost;

};

export const editPost = async ({ title, content, id, coverImage, slug }) => {

    const oldSlug = await prisma.post.findFirst({
        where: {
            id_post: Number(id)
        }
    });

    const newPost = await prisma.post.update({
        where: {
            id_post: Number(id)
        },
        data: {
            nm_title: title,
            de_content: content,
            cover_image: coverImage,
            slug
        }
    });

    const isOldSlug = await prisma.old_slugs.findFirst({
        where: {
            id_post: Number(id),
            old_slug: oldSlug.slug
        }
    });

    if (!isOldSlug) {
        await prisma.old_slugs.create({
            data: {
                id_post: Number(id),
                old_slug: oldSlug.slug,
            }
        });
    };

    return newPost;

};

export const excludePost = async (id) => {

    await prisma.post.delete({
        where: {
            id_post: Number(id)
        }
    });

};

export const getTotalPostsCount = async (idUser) => {

    const totalPosts = await prisma.post.count({
        where: idUser ? { id_user: idUser } : {},
    });

    return totalPosts;

};