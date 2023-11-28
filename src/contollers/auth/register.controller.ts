import { fastify } from '../..';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';

export const registerController = async (request: any, reply: any) => {
	const { firstName, lastName, age, email, password, roleName } = request.body;
	const userRole = roleName ? roleName : 'Visitor';
	try {
		const userExists = await User.findOne({ where: { email: email } });

		if (userExists) {
			fastify.log.error('Duplicate user');
			return reply.status(400).send({ message: 'user exists' });
		}
		let role = await Role.findOne({ where: { roleName: userRole } });
		console.log(66666, role);
		if (!role) {
			role = await Role.findOrCreate({ where: { roleName: 'Visitor' } });
		}
		const hashedPassword = await fastify.bcrypt.hash(password);
		const newUser = await User.create({
			firstName,
			lastName,
			age,
			email,
			password: hashedPassword,
		});
		console.log(77777, role);
		role.setUser(newUser);
		return reply.status(200).send({ newUser });
	} catch (error) {
		console.log(error);
	}
};
