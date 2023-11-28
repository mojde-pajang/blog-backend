export const meController = async function (request: any, reply: any) {
	return reply.status(200).send(request.user);
};
