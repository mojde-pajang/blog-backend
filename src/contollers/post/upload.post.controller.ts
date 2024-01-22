import { uploadsFolder } from '../..';
import path from 'path';
import * as fs from 'fs-extra';

export const uploadPostImage = async (request: any, reply: any) => {
	try {
		const data = await request.file();
		const { filename, file } = data;

		// Convert the file stream to a Buffer
		const fileBuffer = await data.toBuffer();

		// Save the file to the uploads folder
		const filePath = path.join(uploadsFolder, filename);
		await fs.writeFile(filePath, fileBuffer);

		reply.code(201).send({ success: true, message: 'File uploaded successfully' });
	} catch (error) {
		console.error(error);
		reply.code(500).send({ success: false, message: 'Internal Server Error' });
	}

	reply.send();
};
