import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { uploadsFolder } from '../..';
import OpenAI from 'openai';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type payload = {
	title: string;
	description: string | null;
	Gallery?: {
		name: string;
		imageUrl: string;
	};
};
export const createPostWithAI = async (request: any, reply: any) => {
	const { title, imageDescription } = request.body;
	try {
		const { Post, Gallery } = request.server.sequelize.models;
		if (request.isAdmin) {
			const openai = new OpenAI({
				apiKey: process.env['OPENAI_API_KEY'],
			});
			const completion = await openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: title + 'return the result in JSON format with 2 fields of title and introduction',
					},
				],
				model: 'gpt-3.5-turbo',
			});
			const image = await openai.images.generate({
				model: 'dall-e-3',
				prompt: imageDescription,
				n: 1,
				size: '1024x1024',
			});
			const image_url: any = image.data[0].url;
			const response = await axios.get(image_url, { responseType: 'arraybuffer' });
			const buffer = Buffer.from(response.data, 'utf-8');
			// Save the file to the uploads folder
			const fileName = uuidv4() + '.png';
			const filePath = path.join(uploadsFolder, fileName);
			const uploaded = await fs.writeFile(filePath, buffer);
			const content = completion.choices[0].message.content;
			const a = JSON.parse(content ? content : '');
			if (content) {
				const postTitle = a?.title;
				const postIntroduction = a?.introduction;
				const payload: payload = {
					title: postTitle,
					description: postIntroduction,
					Gallery: {
						name: fileName,
						imageUrl: image_url,
					},
				};
				const newPost = await Post.create(payload, {
					include: [Gallery],
				});

				return reply.status(StatusCodes.OK).send({ newPost });
			} else {
				return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'AI is not available' });
			}
		}
		return reply.status(StatusCodes.UNAUTHORIZED).send({ message: 'Unauthorized, you can not create post' });
	} catch (error) {
		console.log(error);
		return reply.status(StatusCodes.SERVICE_UNAVAILABLE).send({ message: error });
	}
};
