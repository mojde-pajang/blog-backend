const fp = require('fastify-plugin');

module.exports = fp(async function (fastify: any, opts: any, done: any) {
	fastify.decorate('authenticate', async function (request: any, reply: any) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});

	done();
});
