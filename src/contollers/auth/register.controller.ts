import { FastifyInstance } from 'fastify/types/instance';
import { fastify } from '../../index';
export const registerController = async (request: any, reply: any) => {
	const { firstName, lastName, age, email, password, roleName } = request.body;
	console.log(123, request.body);
	const models = request.server.sequelize.models;
	const userRole = roleName ? roleName : 'Visitor';

	try {
		const userExists = await models.User.findOne({ where: { email: email } });

		if (userExists) {
			fastify.log.error('Duplicate user');
			return reply.status(400).send({ message: 'user exists' });
		}
		let role = await models.Role.findOne({ where: { roleName: userRole } });

		if (!role) {
			const [newRole, created] = await models.Role.findOrCreate({ where: { roleName: 'Visitor' } });
			role = newRole;
		}
		const hashedPassword = await fastify.bcrypt.hash(password);
		const newUser = await models.User.create({
			firstName,
			lastName,
			age,
			email,
			password: hashedPassword,
		});
		newUser.setRole(role);
		return reply.status(200).send({ newUser });
	} catch (error) {
		console.log(error);
	}
};
