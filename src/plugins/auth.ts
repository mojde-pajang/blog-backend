import { Role } from '../models/role.model';
import { User } from '../models/user.model';

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	fastify.decorate('authenticate', async function (request: any, reply: any) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});

	fastify.decorate('isAdmin', async function (request: any, reply: any) {
		//const decodedToken = fastify.jwt.decode(token);
		try {
			const { email } = await request.jwtDecode();
			const user = await User.findOne({ where: { email: email }, include: Role });
			return (request.isAdmin = 'Admin' === user.Role.roleName);
		} catch (err) {
			reply.status(401).send(err);
		}
	});

	done();
});
