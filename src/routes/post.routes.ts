import { createPost } from '../contollers/post/create.post.controller';

async function postRoutes(fastify: any, options: any) {
	fastify.post('/', createPost);
}

module.exports = postRoutes;
