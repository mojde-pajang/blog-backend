const sequelizeFastify = require('sequelize-fastify');
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
		sequelizeFastify,
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
	.then((data: any) => console.log(data))
	.catch((err: any) => console.log(err));
