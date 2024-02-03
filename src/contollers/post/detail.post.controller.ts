// import { StatusCodes } from 'http-status-codes';
// import { Post } from '../../models/post.model';
// import { Gallery } from '../../models/gallery.model';

// export const detailPost = async (request: any, reply: any) => {
// 	const { id } = request.params;
// 	try {
// 		const post = await Post.findOne({ where: { id: id }, include: Gallery });
// 		return reply.status(StatusCodes.OK).send({ post });
// 	} catch (error) {
// 		return reply.status(StatusCodes.NOT_FOUND).send({ error });
// 	}
// };
export const detailPost = async (request: any, reply: any) => {
	return reply.status(200).send({});
};
