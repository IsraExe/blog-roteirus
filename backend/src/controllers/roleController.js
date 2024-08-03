import { createRole } from '../repositories/roleRepository.js';
import verifyReqFields from '../utils/verifyReqFields.js';

const create = async (req, res, next) => {

    const { name } = req.body;

    verifyReqFields({requiredFields: ['name'], fields: req.body});

    await createRole(name);

    return res.status(201).send({ message: 'Role created' });

};

export { create };