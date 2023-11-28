import { Post } from '../../models/post.model';

export const createPost = async (request: any, reply: any) => {
	const { title, description } = request.body;
	console.log(55, title, description);
	try {
		const newPost = await Post.create({ title, description });
		console.log(newPost);
		return reply.status(200).send({ newPost });
	} catch (error) {
		return reply.status(400).send({ error });
	}
};
