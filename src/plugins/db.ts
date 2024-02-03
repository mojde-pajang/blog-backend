import { dbInit } from '../db';

const { Sequelize } = require('sequelize');

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	console.log(111, process.env.DATABASE_NAME, process.env.DATABASE_URL);
	const sequelize = process.env.DATABASE_URL
		? new Sequelize({
				dialect: 'postgres',
				connectionString: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false,
				},
		  })
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
