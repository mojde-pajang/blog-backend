import { dbInit } from '../db';

const { Sequelize } = require('sequelize');

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	const sequelize = new Sequelize(
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

	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		fastify.decorate('sequelize', sequelize);
		dbInit(sequelize);
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	done();
});
