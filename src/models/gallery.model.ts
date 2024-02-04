import { Sequelize } from 'sequelize';
const { DataTypes } = require('sequelize');

export function initializeGalleryModel(sequelize: Sequelize) {
	// Access the Sequelize instance from the Fastify instance decorator
	const Gallery = sequelize.define('Gallery', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		imageUrl: {
			type: DataTypes.TEXT,
		},
	});

	return Gallery;
}
