import { badRequestError } from '../utils/errorException.js';

const verifyReqFields = ({requiredFields, fields}) => {
    const missingFields = requiredFields.filter(field => !fields[field]);

    if (missingFields.length > 0) throw badRequestError(`Missing required fields: ${missingFields.join(', ')}`);
};

export default verifyReqFields;