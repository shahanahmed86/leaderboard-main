import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: (name) => User.doesNotExist({ name }),
				message: 'Name has already been taken.'
			}
		},
		location: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			required: true
		},
		units: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		points: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

userSchema.statics.doesNotExist = async function (options) {
	return (await this.where(options).countDocuments()) === 0;
};

const User = model('User', userSchema);

export default User;
