import { fastify } from '../..';
import { User } from '../../models/user.model';

export const registerController = async (request: any, reply: any) => {
	const { firstName, lastName, age, email, password } = request.body;
	try {
		const userExists = await User.findOne({ where: { email: email } });
		if (userExists) {
			fastify.log.error('Duplicate user');
			return reply.status(400).send({ message: 'user exists' });
		}
		const hashedPassword = await fastify.bcrypt.hash(password);
		console.log(66, hashedPassword);
		const newUser = await User.create({
			firstName,
			lastName,
			age,
			email,
			password: hashedPassword,
		});
		return reply.status(200).send({ newUser });
	} catch (error) {
		console.log(error);
	}
};
