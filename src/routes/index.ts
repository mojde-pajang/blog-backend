async function routes(fastify: any, options: any) {
	fastify.register(require('./auth.routes'), { prefix: '/auth' });
	fastify.register(require('./post.routes'), { prefix: '/post' });
	fastify.get('/', async function (request: any, reply: any) {
		return reply.send({ hello: 'world' });
	});

	fastify.get('/log', async function (request: any, reply: any) {
		return reply.send({ hello: 'Log' });
	});
}

export default routes;
