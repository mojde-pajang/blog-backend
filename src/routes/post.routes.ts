import { allPosts } from '../contollers/post/all.post.controller';
import { createPost } from '../contollers/post/create.post.controller';
import { detailPost } from '../contollers/post/detail.post.controller';
import { editPost } from '../contollers/post/edit.post.controller';

async function postRoutes(fastify: any, options: any) {
	fastify.post(
		'/',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		createPost,
	);
	fastify.get('/all', allPosts);
	fastify.get('/:id', detailPost);
	fastify.put(
		'/:id',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		editPost,
	);
}

module.exports = postRoutes;
