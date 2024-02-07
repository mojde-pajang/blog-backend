import { fastify } from '../../index';

export const registerController = async (request: any, reply: any) => {
	const { firstName, lastName, age, email, password, roleName } = request.body;

	try {
		const { User, Role } = request.server.sequelize.models;

		const userExists = await User.findOne({ where: { email: email } });

		if (userExists) {
			fastify.log.error('Duplicate user');
			return reply.status(400).send({ message: 'User exists' });
		}
		const userRole = roleName ? roleName : 'Visitor';
		let role = await Role.findOne({ where: { roleName: userRole } });
		if (!role) {
			const [newRole, created] = await Role.findOrCreate({ where: { roleName: userRole } });
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
