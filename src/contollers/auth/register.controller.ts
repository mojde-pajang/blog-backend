import { FastifyInstance } from 'fastify/types/instance';
import { fastify } from '../../index';

export const registerController = async (request: any, reply: any) => {
	const { firstName, lastName, age, email, password, roleName } = request.body;
	console.log(123, request.body);

	try {
		console.log('models', request.server.sequelize.models);
		const { User, Role } = request.server.sequelize.models;

		const userExists = await User.findOne({ where: { email: email } });

		if (userExists) {
			fastify.log.error('Duplicate user');
			return reply.status(400).send({ message: 'User exists' });
		}

		let role = await Role.findOne({ where: { roleName: roleName || 'Visitor' } });

		if (!role) {
			const [newRole, created] = await Role.findOrCreate({ where: { roleName: 'Visitor' } });
			role = newRole;
		}

		const hashedPassword = await fastify.bcrypt.hash(password);

		const newUser = await User.create({
			firstName,
			lastName,
			age,
			email,
			password: hashedPassword,
		});

		await newUser.setRole(role);

		return reply.status(200).send({ newUser });
	} catch (error) {
		console.error(error);
		return reply.status(500).send({ message: 'Internal Server Error' });
	}
};
