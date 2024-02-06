// import { StatusCodes } from 'http-status-codes';

export const detailPost = async (request: any, reply: any) => {
	const { id } = request.params;
	try {
		const { Post, Gallery } = request.server.sequelize.models;

		const post = await Post.findOne({ where: { id: id }, include: Gallery });
		return reply.status(200).send({ post });
	} catch (error) {
		return reply.status(404).send({ error });
	}
};
