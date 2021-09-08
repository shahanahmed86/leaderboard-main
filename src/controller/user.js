import { User } from '../model';
import { middleware, validation } from '../utils';

export async function users(req, res) {
	try {
		await validation.validate(validation.pagination, req.query);

		const errors = [];
		const { skip, limit } = req.query;
		if (skip < 0) errors.push('Skip cannot be less than zero(0)');
		if (limit <= 0) errors.push('and limit should be greater than zero(0)');
		if (errors.length) throw new Error(errors.join(' '));

		const counts = await User.countDocuments();
		if (skip >= counts) return middleware.handleSuccess([], res, 200);

		const requestedCounts = skip + limit;
		const data = await User.find()
			.limit(requestedCounts < counts ? limit : counts - skip)
			.skip(skip);

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		middleware.handleError(error, res);
	}
}

export async function user(req, res) {
	try {
		const { id } = req.params;
		if (typeof id !== 'string' || !id) throw new Error('Please provide user Id');

		const data = await User.findOne({ _id: id });
		if (!data) throw new Error('User not found with the ID');

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		middleware.handleError(error, res);
	}
}

export async function createUser(req, res) {
	try {
		await validation.validate(validation.createUser, req.body);

		const data = await User.create(req.body);

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		middleware.handleError(error, res);
	}
}

export async function updateUser(req, res) {
	try {
		const { id } = req.params;
		if (typeof id !== 'string' || !id) throw new Error('Please provide user Id');

		const data = await User.findOne({ _id: id });
		if (!data) throw new Error('User not found with the ID');

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		middleware.handleError(error, res);
	}
}

export async function deleteUser(req, res) {
	try {
		const { id } = req.params;
		if (typeof id !== 'string' || !id) throw new Error('Please provide user Id');

		const data = await User.findOne({ _id: id });
		if (!data) throw new Error('User not found with the ID');

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		middleware.handleError(error, res);
	}
}
