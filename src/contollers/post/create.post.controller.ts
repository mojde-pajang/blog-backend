import { Post } from '../../models/post.model';

export const createPost = async (request: any, reply: any) => {
	const { title, description } = request.body;
	try {
		if (request.isAdmin) {
			const newPost = await Post.create({ title, description });
			return reply.status(200).send({ newPost });
		}
		return reply.status(401).send({ message: 'Unauthorized, you can not create post' });
	} catch (error) {
		return reply.status(400).send({ error });
	}
};
