// user.model.controller.ts
const { DataTypes } = require('sequelize');
import { Sequelize } from 'sequelize';

export function initializeRoleModel(sequelize: Sequelize) {
	// Access the Sequelize instance from the Fastify instance decorator
	const Role = sequelize.define('Role', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		roleName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				is: /^[a-zA-Z]*/gm,
			},
		},
		description: {
			type: DataTypes.STRING,
		},
	});

	return Role;
}
