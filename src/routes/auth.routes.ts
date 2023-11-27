import { loginController } from '../contollers/auth/login.auth.controller';
import { registerController } from '../contollers/auth/register.controller';

async function auth(fastify: any, options: any) {
	fastify.post('/register', registerController);
	fastify.post('/login', loginController);
}

module.exports = auth;
