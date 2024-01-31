require('dotenv').config();
// Import the framework and instantiate it
import Fastify from 'fastify';
import { fastifyBcrypt } from 'fastify-bcrypt';
import { fastifyJwt } from '@fastify/jwt';
import cors from '@fastify/cors';
import * as fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';

const { Sequelize } = require('sequelize');
export const fastify = Fastify({
	logger: true,
});

declare module 'fastify' {
	interface FastifyInstance {
		axios: any;
	}
}

fastify.register(fastifyBcrypt, {
	saltWorkFactor: 12,
});

fastify.register(fastifyJwt, {
	secret: 'supersecret',
});

fastify.register(cors, {
	origin: '*',
	methods: ['GET', 'POST'],
	credentials: true,
});

fastify.register(require('fastify-axios'));

fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });

// Set up the uploads folder
export const uploadsFolder = path.join(__dirname, '..', 'public/uploads');
fs.ensureDirSync(uploadsFolder);

// Serve the uploads folder as a static directory
fastify.register(require('@fastify/static'), {
	root: uploadsFolder,
	prefix: '/uploads',
});

export const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		database: process.env.DATABASE_NAME,
	},
);

// Declare a plugins
fastify.register(require('./plugins/auth'));

// Declare a routes
fastify.register(require('./routes'));

// Run the server!
const port = parseInt(process.env.PORT ?? '3000');
fastify
	.listen({ port, host: '0.0.0.0' })
	.then(() => {
		console.log(
			`*********************************************\n*********************************************\n*********************************************`,
		);
		return sequelize.authenticate();
	})
	.then(() => {
		console.log(`Connection has been established successfully.`);
		console.log('server runs in http://localhost:3000');
		console.log(
			`*********************************************\n*********************************************\n*********************************************`,
		);
	})
	.catch((err) => {
		fastify.log.error(err);
	});
