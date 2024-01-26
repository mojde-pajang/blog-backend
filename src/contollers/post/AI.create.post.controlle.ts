import { Post } from '../../models/post.model';
import { StatusCodes } from 'http-status-codes';
import OpenAI from 'openai';

type payload = {
	title: string;
	description: string | null;
	Gallery?: {
		name: string;
		imageUrl: string;
	};
};
export const createPostWithAI = async (request: any, reply: any) => {
	const { title } = request.body;

	try {
		if (request.isAdmin) {
			const openai = new OpenAI({
				apiKey: process.env['OPENAI_API_KEY'],
			});
			const completion = await openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: title,
					},
				],
				model: 'gpt-3.5-turbo',
			});
			const content = completion.choices[0].message.content;
			if (content) {
				const postTitle = JSON.parse(content)?.Title;
				const postIntroduction = JSON.parse(content)?.Introduction;

				const payload: payload = {
					title: postTitle,
					description: postIntroduction,
				};
				const newPost = await Post.create(payload);

				return reply.status(StatusCodes.OK).send({ newPost });
			} else {
				return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'AI is not available' });
			}
		}
		return reply.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized, you can not create post' });
	} catch (error) {
		return reply.status(StatusCodes.SERVICE_UNAVAILABLE).send({ message: 'We are out of credit' });
	}
};
