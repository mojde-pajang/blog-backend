import { sequelize } from './../index';
const { DataTypes, Model } = require('sequelize');

export class User extends Model {}

User.init(
	{
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
	},
	{
		sequelize,
	},
);

User.sync({ alter: true })
	.then(() => {
		console.log(User === sequelize.models.User);
	})
	.catch((err: any) => console.log(err));
