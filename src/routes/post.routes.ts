import { createPostWithAI } from '../contollers/post/AI.create.post.controlle';
import { allPosts } from '../contollers/post/all.post.controller';
import { createPost } from '../contollers/post/create.post.controller';
import { deletePost } from '../contollers/post/delete.post.controller';
import { detailPost } from '../contollers/post/detail.post.controller';
import { editPost } from '../contollers/post/edit.post.controller';
import { uploadPostImage } from '../contollers/post/upload.post.controller';

async function postRoutes(fastify: any, options: any) {
	fastify.post(
		'/',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		createPost,
	);

	fastify.post(
		'/ai',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		createPostWithAI,
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

	fastify.delete(
		'/:id',
		{
			onRequest: [fastify.authenticate, fastify.isAdmin],
		},
		deletePost,
	);

	// fastify.post(
	// 	'/upload',
	// 	{
	// 		onRequest: [fastify.authenticate, fastify.isAdmin],
	// 	},
	// 	uploadPostImage,
	// );
}

module.exports = postRoutes;
