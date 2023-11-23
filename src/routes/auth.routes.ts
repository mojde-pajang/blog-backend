import { registerController } from '../contollers/auth/register.controller';

async function auth(fastify: any, options: any) {
	fastify.post('/register', registerController);
}

module.exports = auth;
