import { loginController } from '../contollers/auth/login.auth.controller';
import { registerController } from '../contollers/auth/register.controller';
import { meController } from '../contollers/user/me.controller';

async function auth(fastify: any, options: any) {
	fastify.post('/register', registerController);
	fastify.post('/login', loginController);
	fastify.get(
		'/me',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		meController,
	);
}

module.exports = auth;
