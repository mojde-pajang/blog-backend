import { User } from '../../models/user.model';

export const registerController = async (request: any, reply: any) => {
	const { email, password } = request.body;
	try {
		const a = User.findAll();
		console.log(a);
		return reply.send({ email, password, text: 'OK' });
	} catch (error) {
		console.log(error);
	}
};
