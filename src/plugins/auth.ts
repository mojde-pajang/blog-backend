const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	fastify.decorate('authenticate', async function (request: any, reply: any) {
		try {
			const token = await request.jwtVerify();
			return (request.authenticate = token);
		} catch (err) {
			reply.send(err);
		}
	});

	fastify.decorate('isAdmin', async function (request: any, reply: any) {
		try {
			const { User, Role } = fastify.sequelize.models;
			const { email } = await request.jwtDecode();
			const user = await User.findOne({ where: { email: email }, include: Role });
			return (request.isAdmin = 'Admin' === user.Role.roleName ? user : false);
		} catch (err) {
			reply.status(401).send(err);
		}
	});

	done();
});
