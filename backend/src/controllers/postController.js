import { createPost } from '../repositories/postRepository.js';

const create = async (req, res) => {

    const { title, content } = req.body;
    const { id } = req.metadata;

    await createPost({ title, content, id });

    return res.status(200).send({ message: 'Created!' })

};

export { create };