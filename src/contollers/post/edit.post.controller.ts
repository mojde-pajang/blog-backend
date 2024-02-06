import { StatusCodes } from 'http-status-codes';

export const editPost = async (request: any, reply: any) => {
	const { id } = request.params;

	const variables = request.body;
	const payload: { title?: string; description?: string } = {};
	for (const key in variables) {
		if (key == 'title' || key == 'description') {
			payload[key] = variables[key];
		}
	}
	try {
		const { Post } = request.server.sequelize.models;
		if (Object.keys(payload).length) {
			const updatedPost = await Post.update(payload, {
				where: {
					id: id,
				},
			});
			return reply.status(StatusCodes.OK).send({ updatedPost });
		}
		const post = await Post.findOne({
			where: {
				id: id,
			},
		});
		return reply.status(StatusCodes.OK).send({ updatedPost: post });
	} catch (error) {
		return reply.status(500).send({ error });
	}
};
