import { StatusCodes } from 'http-status-codes';

export const allPosts = async (request: any, reply: any) => {
	try {
		const { Post } = request.server.sequelize.models;
		const posts = await Post.findAll();
		return reply.status(StatusCodes.OK).send({ posts });
	} catch (error) {
		return reply.status(400).send({ error });
	}
};
