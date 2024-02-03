import { dbInit } from '../db';
import pgConnection from 'pg-connection-string';
const { Sequelize } = require('sequelize');

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	const dbConfig = pgConnection.parse(process.env.DATABASE_URL as string);
	console.log({ dbConfig });
	const sequelize = process.env.DATABASE_URL
		? new Sequelize(process.env.DATABASE_URL, { url: process.env.DATABASE_URL, dialect: 'postgres' })
		: new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
				dialect: 'postgres',
				host: process.env.DATABASE_HOST,
				port: process.env.DATABASE_PORT,
				database: process.env.DATABASE_NAME,
				ssl: true,
		  });

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
