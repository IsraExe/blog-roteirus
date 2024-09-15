import { addPost, deletePost, showAllPosts, showOnePost } from '../services/postService.js';
import { badRequestError } from '../utils/errorException.js';

export const showAll = async (req, res) => {
    const allPosts = await showAllPosts();

    //TODO: PAGINATION

    return res.status(200).send({ message: allPosts });
};

export const getOne = async (req, res) => {
    const { id } = req.params;

    const post = await showOnePost(id);

    return res.status(200).send({ data: post })
};

export const create = async (req, res, next) => {
    const { id } = req.metadata;
    const { title, content } = req.body;

    if (!content) next(badRequestError('The content must be filled'))

    await addPost({ id, title, content });

    return res.status(200).send({ message: 'Created!' });
};

export const exclude = (req, res) => {
    const { id } = req.query; 
    
    deletePost(id);

    return res.status(204).send();
};