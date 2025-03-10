import { addPost, deletePost, showOnePost, updatePost, showAllPosts } from '../services/postService.js';
import { badRequestError } from '../utils/errorException.js';

export const showAll = async (req, res) => {
    const { page } = req.query;

    const allPosts = await showAllPosts(page);

    return res.status(200).send({ data: allPosts });
};

export const getOne = async (req, res) => {
    const { id } = req.params;

    const post = await showOnePost(id);

    return res.status(200).send({ data: post })
};

export const create = async (req, res, next) => {
    const { id } = req.metadata;
    const { title, content, coverImage } = req.body;
    
    if (!content) next(badRequestError('The content must be filled'))

    const postInformation = await addPost({ id, title, content, coverImage });

    return res.status(200).send({ data: postInformation });
};

export const edit = async (req, res, next) => {
    const { title, content, id, coverImage } = req.body;

    if (!content) next(badRequestError('The content must be filled'));

    const postInformation = await updatePost({ id, title, content, coverImage });

    return res.status(200).send({ data: postInformation });
};

export const exclude = (req, res, next) => {
    const { id } = req.params; 

    if (!id) next(badRequestError('The content must be filled'));
    
    deletePost(id);

    return res.status(204).send();
};