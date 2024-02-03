require('dotenv').config();
import Fastify from 'fastify';
import { fastifyBcrypt } from 'fastify-bcrypt';
import { fastifyJwt } from '@fastify/jwt';
import cors from '@fastify/cors';
import * as fs from 'fs-extra';
import path from 'path';
import 'dotenv/config';
import { dbInit } from './db';

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

fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });

// Set up the uploads folder
export const uploadsFolder = path.join(__dirname, '..', 'public/uploads');
fs.ensureDirSync(uploadsFolder);

// Serve the uploads folder as a static directory
fastify.register(require('@fastify/static'), {
	root: uploadsFolder,
	prefix: '/uploads',
});

// Declare app plugins
fastify.register(require('./plugins/db'));
fastify.register(require('./routes'));

//fastify.register(require('./plugins/auth'));

// Run the server!
const port = parseInt(process.env.PORT ?? '3000');

fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	// Server is now listening on ${address}
	console.log(`server runs in ${address}`);
	console.log(
		`*********************************************\n*********************************************\n*********************************************`,
	);
});
