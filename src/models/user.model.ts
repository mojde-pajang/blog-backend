import { Sequelize } from 'sequelize';

const { DataTypes } = require('sequelize');
export function initializeUserModel(sequelize: Sequelize) {
	// Define the User model
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^[a-zA-Z]*/gm,
			},
		},
		lastName: {
			type: DataTypes.STRING,
			validate: {
				is: /^[a-zA-Z]*/gm,
			},
		},
		age: {
			type: DataTypes.INTEGER,
			validate: {
				min: 18,
			},
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				min: 8,
			},
		},
		token: {
			type: DataTypes.STRING,
		},
	});

	return User;
}
