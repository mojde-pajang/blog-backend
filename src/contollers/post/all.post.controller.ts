import { StatusCodes } from 'http-status-codes';
import { Post } from '../../models/post.model';

export const allPosts = async (request: any, reply: any) => {
	try {
		const posts = await Post.findAll();
		return reply.status(StatusCodes.OK).send({ posts });
	} catch (error) {
		return reply.status(400).send({ error });
	}
};
