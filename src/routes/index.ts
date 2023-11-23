async function routes(fastify: any, options: any) {
	fastify.register(require('./auth.routes'), { prefix: '/auth' });
	fastify.get('/', options, async function (request: any, reply: any) {
		return reply.send({ hello: 'world' });
	});
}

module.exports = routes;
