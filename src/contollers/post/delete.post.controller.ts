import { StatusCodes } from 'http-status-codes';
import { Post } from '../../models/post.model';

export const deletePost = async (request: any, reply: any) => {
	const { id } = request.params;
	try {
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
