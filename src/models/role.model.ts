import { sequelize } from './../index';
const { DataTypes, Model } = require('sequelize');

export class Role extends Model {}

Role.init(
	{
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
		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		write: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
	},
);

Role.sync({ alter: true })
	// .then(() => {
	// 	return Role.bulkCreate([
	// 		{
	// 			roleName: 'Admin',
	// 			write: true,
	// 		},
	// 		{
	// 			roleName: 'Visitor',
	// 		},
	// 	]);
	// })
	.then(() => {
		console.log(Role === sequelize.models.Role, 'Role model created');
	})
	.catch((err: any) => console.log(err));
