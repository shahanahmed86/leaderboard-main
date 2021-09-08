import Joi from 'joi';

export const validate = async (schema, payload) => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (error) {
		throw new Error(error.message);
	}
};

export const name = Joi.string().min(4).max(30).required().label('Name');
export const location = Joi.string().min(4).max(30).required().label('Location');
export const date = Joi.date().required().label('Date');
export const units = Joi.string().min(4).max(30).required().label('Units');
export const type = Joi.string().min(4).max(50).required().label('Type');
export const points = Joi.number().min(0).required().label('Points');

export const createUser = Joi.object().keys({ name, location, date, units, type, points });

export const skip = Joi.number().required().label('Skip');
export const limit = Joi.number().required().label('Limit');

export const pagination = Joi.object().keys({ skip, limit });
