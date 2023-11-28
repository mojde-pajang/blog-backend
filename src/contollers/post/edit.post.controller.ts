import { StatusCodes } from 'http-status-codes';
import { Post } from '../../models/post.model';

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
		if (Object.keys(payload).length) {
			const updatedPost = await Post.update(payload, {
				where: {
					id: id,
				},
			});
			console.log(89, updatedPost);
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
