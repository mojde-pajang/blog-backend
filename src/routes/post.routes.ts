import { allPosts } from '../contollers/post/all.post.controller';
import { createPost } from '../contollers/post/create.post.controller';

async function postRoutes(fastify: any, options: any) {
	fastify.post(
		'/',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		createPost,
	);
	fastify.get('/all', allPosts);
}

module.exports = postRoutes;
