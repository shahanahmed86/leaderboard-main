import { IN_PROD } from '../config';

export function handleError(error, res, statusCode = 400) {
	if (!IN_PROD) console.error(error);
	res.status(statusCode).send(error.message);
}

export function handleSuccess(body, res, statusCode = 200) {
	res.status(statusCode)[typeof body === 'string' ? 'send' : 'json'](body);
}
