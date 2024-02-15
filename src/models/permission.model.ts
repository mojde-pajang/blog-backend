const { DataTypes } = require('sequelize');
import { Sequelize } from 'sequelize';

export function initializePermissionModel(sequelize: Sequelize) {
	const Permission = sequelize.define('Permission', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		permissionName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
		},
	});

	return Permission;
}
