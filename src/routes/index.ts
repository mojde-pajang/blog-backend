async function routes(fastify: any, options: any) {
	fastify.register(require('./auth.routes'), { prefix: '/auth' });
	fastify.get(
		'/',
		{
			onRequest: [fastify.authenticate],
		},
		async function (request: any, reply: any) {
			return reply.send({ hello: 'world' });
		},
	);
	fastify.get('/log', async function (request: any, reply: any) {
		return reply.send({ hello: 'Log' });
	});
}

module.exports = routes;
