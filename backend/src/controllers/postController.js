import { addPost, deletePost, showOnePost, updatePost, showAllPosts } from '../services/postService.js';
import { badRequestError } from '../utils/errorException.js';

export const showAll = async (req, res) => {
    const { page } = req.query;

    const allPosts = await showAllPosts(page);

    return res.status(200).send({ data: allPosts });
};

export const getOne = async (req, res) => {
    const { slug } = req.params;

    const post = await showOnePost(slug);

    return res.status(200).send({ data: post })
};

export const create = async (req, res, next) => {
    const { id } = req.metadata;
    const { title, content, coverImage } = req.body;

    const slug = title.toLowerCase().replace(/\s+/g, '-');
    
    if (!content) next(badRequestError('The content must be filled'))

    const postInformation = await addPost({ id, title, content, coverImage, slug });

    return res.status(200).send({ data: postInformation });
};

export const edit = async (req, res, next) => {
    const { title, content, id, coverImage } = req.body;

    if (!content) next(badRequestError('The content must be filled'));

    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const postInformation = await updatePost({ id, title, content, coverImage, slug });

    return res.status(200).send({ data: postInformation });
};

export const exclude = (req, res, next) => {
    const { id } = req.params; 

    if (!id) next(badRequestError('The content must be filled'));
    
    deletePost(id);

    return res.status(204).send();
};