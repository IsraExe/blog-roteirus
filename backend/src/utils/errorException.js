const errorException = (statusCode, message) => {

    const error = Error(message);

    error.statusCode = statusCode;

    return error;

};

export const badRequestError = (message) => errorException(400, message);
export const unauthorizedError = (message) => errorException(401, message);
export const forbiddenError = (message) => errorException(403, message);
export const notFoundError = (message) => errorException(404, message);
export const conflictError = (message) => errorException(409, message);
export const internalServerError = (message) => errorException(500, message);
export const unprocessableEntity = (message) => errorException(422, message);
 
export default errorException;