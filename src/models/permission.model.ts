import { sequelize } from './../index';
const { DataTypes, Model } = require('sequelize');

export class Permission extends Model {}

Permission.init(
	{
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
	},
	{
		sequelize,
	},
);

Permission.sync({ alter: true })
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
		console.log('Permission role association model created');
	})
	.catch((err: any) => console.log(err));
