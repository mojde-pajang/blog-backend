import { fastify } from '../..';
import { User } from '../../models/user.model';

export const loginController = async (request: any, reply: any) => {
	const { email, password } = request.body;
	try {
		const user = await User.findOne({ where: { email } });
		if (user) {
			const result = await fastify.bcrypt.compare(password, user.password);
			if (result) {
				const token = fastify.jwt.sign({ userId: user.id, email: user.email });
				user.token = token;
				const updatedUser = await user.save({ fields: ['token'] });
				return reply.status(200).send({ user: updatedUser, message: 'OK' });
			}
		}
		return reply.status(400).send({ message: 'Invalid credential' });
	} catch (error) {
		fastify.log.error(error);
	}
};
