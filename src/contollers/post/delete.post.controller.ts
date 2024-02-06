import { StatusCodes } from 'http-status-codes';

export const deletePost = async (request: any, reply: any) => {
	const { id } = request.params;
	try {
		const { Post } = request.server.sequelize.models;
		const deletedPost = await Post.destroy({
			where: {
				id: id,
			},
		});
		return reply.status(StatusCodes.OK).send({ deletedPost });
	} catch (error) {
		return reply.status(500).send({ error });
	}
};
