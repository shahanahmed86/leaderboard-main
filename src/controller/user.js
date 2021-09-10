import { User } from '../model';
import { findByIdFromDb, isFieldEmpty, middleware, validation } from '../utils';

export async function users(req, res) {
	try {
		await validation.validate(validation.pagination, req.query);

		const errors = [];
		const skip = +req.query.skip;
		const limit = +req.query.limit;
		if (skip < 0) errors.push('Skip cannot be less than zero(0)');
		if (limit <= 0) errors.push('and limit should be greater than zero(0)');
		if (errors.length) throw new Error(errors.join(' '));

		const counts = await User.countDocuments();
		if (skip >= counts) return middleware.handleSuccess([], res, 200);

		const requestedCounts = skip + limit;
		const requestedLimit = requestedCounts < counts ? limit : counts - skip;
		const data = await User.find().limit(requestedLimit).skip(skip);

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		return middleware.handleError(error, res);
	}
}

export async function user(req, res) {
	try {
		isFieldEmpty(req.params.id, 'User');

		const data = await findByIdFromDb(req.params.id, 'User', 'User with this ID');

		return middleware.handleSuccess(data, res, 200);
	} catch (error) {
		return middleware.handleError(error, res);
	}
}

export async function createUser(req, res) {
	try {
		await validation.validate(validation.createUser, req.body);

		const data = await User.create(req.body);

		return middleware.handleSuccess(data, res, 201);
	} catch (error) {
		return middleware.handleError(error, res);
	}
}

export async function updateUser(req, res) {
	try {
		isFieldEmpty(req.params.id, 'User');

		await findByIdFromDb(req.params.id, 'User', 'User with this ID');

		const fields = ['name', 'location', 'date', 'units', 'type', 'points'];
		const body = {};
		await Promise.all(
			fields.map(async (k) => {
				if (k in req.body) {
					await validation.validate(validation[k], req.body[k]);
					body[k] = req.body[k];
				}
			})
		);

		const data = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: { ...req.body } },
			{ new: true }
		);

		return middleware.handleSuccess(data, res, 201);
	} catch (error) {
		return middleware.handleError(error, res);
	}
}

export async function deleteUser(req, res) {
	try {
		isFieldEmpty(req.params.id, 'User');

		await findByIdFromDb(req.params.id, 'User', 'User with this ID');

		await User.findByIdAndDelete(req.params.id);

		return middleware.handleSuccess('User Deleted Successfully', res, 200);
	} catch (error) {
		return middleware.handleError(error, res);
	}
}
