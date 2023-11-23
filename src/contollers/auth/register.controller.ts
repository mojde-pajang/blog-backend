export const registerController = async (request: any, reply: any) => {
	const { email, password } = request.body;
	try {
		return reply.send({ email, password, text: 'OK' });
	} catch (error) {
		console.log(error);
	}
};
