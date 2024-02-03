import { fastify } from '../..';

export const loginController = async (request: any, reply: any) => {
	const { email, password } = request.body;
	const { User } = request.server.sequelize.models;
	try {
		const user = await User.findOne({ where: { email } });

		if (user && user.password) {
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
