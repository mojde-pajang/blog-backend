// Import the framework and instantiate it
import Fastify from 'fastify';
const fastify = Fastify({
	logger: true,
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
	return { hello: 'world' };
});

// Run the server!
fastify
	.listen({ port: 3000 })
	.then(() => {
		console.log('server runs in http://localhost:3000');
	})
	.catch((err) => {
		fastify.log.error(err);
	});
