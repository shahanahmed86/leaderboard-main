export const {
	NODE_ENV = 'development',
	PORT = 4000,

	MONGOOSE_URL = 'mongodb+srv://admin:<password>@host/myFirstDatabase?retryWrites=true&w=majority'
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
