import { uploadsFolder } from '../..';
import path from 'path';
import * as fs from 'fs-extra';
import { Gallery } from '../../models/gallery.model';

export const uploadPostImage = async (request: any, reply: any) => {
	try {
		const data = await request.file();
		const { filename } = data;

		// Convert the file stream to a Buffer
		const fileBuffer = await data.toBuffer();

		// Save the file to the uploads folder
		const filePath = path.join(uploadsFolder, filename);
		const uploaded = await fs.writeFile(filePath, fileBuffer);

		// Construct the URL based on server address and relative path
		console.log(request.protocol, request.hostname, request.server);
		const fileUrl = `${request.protocol}://${request.hostname}/uploads/${filename}`;

		const newImage = await Gallery.create({ name: filename, imageUrl: fileUrl });

		reply.code(201).send({ success: true, message: 'File uploaded successfully', image: newImage });
	} catch (error) {
		console.error(error);
		reply.code(500).send({ success: false, message: 'Internal Server Error' });
	}

	reply.send();
};
