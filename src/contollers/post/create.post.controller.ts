import path from 'path';
import * as fs from 'fs-extra';
import { uploadsFolder } from '../..';

type payload = {
	title: string;
	description: string;
	Gallery?: {
		name: string;
		imageUrl: string;
	};
};
export const createPost = async (request: any, reply: any) => {
	const { title, description } = request.body;
	try {
		const { Post, Gallery } = request.server.sequelize.models;
		if (request.isAdmin) {
			// Process image upload
			const uploadImage = await request.body.image;
			const filename = uploadImage?.filename;

			// Convert the file stream to a Buffer
			const fileBuffer = await uploadImage.toBuffer();
			let fileUrl = '';
			if (filename) {
				// Save the file to the uploads folder
				const filePath = path.join(uploadsFolder, filename);
				const uploaded = await fs.writeFile(filePath, fileBuffer);

				fileUrl = `${request.protocol}://${request.hostname}/uploads/${'filename'}`;
			}
			const payload: payload = {
				title: title.value,
				description: description.value,
			};
			if (filename) {
				payload['Gallery'] = {
					name: filename,
					imageUrl: fileUrl,
				};
			}
			const newPost = await Post.create(payload, {
				include: [Gallery],
			});

			return reply.status(200).send({ newPost });
		}
		return reply.status(401).send({ message: 'Unauthorized, you can not create post' });
	} catch (error) {
		console.log(error);
		return reply.status(400).send({ error });
	}
};
