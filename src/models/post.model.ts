const { DataTypes } = require('sequelize');
import { Sequelize } from 'sequelize';

export function initializePostModel(sequelize: Sequelize) {
	// Access the Sequelize instance from the Fastify instance decorator
	const Post = sequelize.define('Post', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
	});

	return Post;
}
