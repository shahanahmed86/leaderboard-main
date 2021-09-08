import 'dotenv/config';

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import { MONGOOSE_URL, PORT } from './config';
import { userRoutes } from './routes';

mongoose
	.connect(MONGOOSE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('connected');

		const app = express();

		// parser
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());

		// cors
		app.use(cors());

		// logs
		app.use(morgan('dev'));

		// x-powered-by
		app.disable('x-powered-by');

		const server = http.createServer(app);

		// routes
		app.use('/api', userRoutes);

		server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
	})
	.catch((e) => {
		console.log('Something went wrong', e);
	})
	.finally(() => {
		console.log('Execution completed');
	});
