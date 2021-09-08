import * as models from '../model';

export function isFieldEmpty(field, title) {
	if (typeof field !== 'string' || !field) throw new Error(`Please provide ${title} ID`);
}

export async function findByIdFromDb(id, table, title) {
	const data = await models[table].findById(id);
	if (!data) throw new Error(`${title} not found`);

	return data;
}
