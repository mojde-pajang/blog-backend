import {
	FastifyLoggerInstance,
	FastifyPluginAsync,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RawServerDefault,
} from 'fastify';

declare module 'fastify' {
	export interface FastifyInstance<
		RawServer extends RawServerBase = RawServerDefault,
		RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
		RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
		Logger = FastifyLoggerInstance,
	> {
		db: {
			authenticate: () => Promise<void>;
			sequelize: Sequelize;
		};
	}
}

export { FastifyInstance } from 'fastify';
