import { createPost } from '../contollers/post/create.post.controller';

async function postRoutes(fastify: any, options: any) {
	fastify.post(
		'/',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		createPost,
	);
}

module.exports = postRoutes;
