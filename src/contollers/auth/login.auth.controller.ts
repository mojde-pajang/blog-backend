import { fastify } from '../..';
import { User } from '../../models/user.model';

export const loginController = async (request: any, reply: any) => {
	const { email, password } = request.body;
	try {
		const user = await User.findOne({ raw: true, where: { email } });
		if (user) {
			const result = await fastify.bcrypt.compare(password, user.password);
			if (result) {
				return reply.status(200).send({ message: user });
			}
		}
		return reply.status(400).send({ message: 'Invalid credential' });
	} catch (error) {
		fastify.log.error(error);
	}
};
