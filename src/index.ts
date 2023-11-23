require('dotenv').config();
// Import the framework and instantiate it
import Fastify from 'fastify';
import 'dotenv/config';

const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const fastify = Fastify({
	logger: true,
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

// Declare a route
fastify.register(require('./routes'));

// Run the server!
const port = parseInt(process.env.PORT ?? '3000');
fastify
	.listen({ port })
	.then(() => {
		return sequelize.authenticate();
	})
	.then(() => {
		console.log('Connection has been established successfully.');
		console.log('server runs in http://localhost:3000');
	})
	.catch((err) => {
		fastify.log.error(err);
	});
