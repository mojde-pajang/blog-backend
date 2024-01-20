import { sequelize } from './../index';
import { Permission } from './permission.model';
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
		description: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
	},
);

Role.sync({ alter: true })
	.then(() => {
		Permission.belongsToMany(Role, { through: 'rolePermission' });
		Role.belongsToMany(Permission, { through: 'rolePermission' });
		console.log(Role === sequelize.models.Role, 'Role model created');
	})
	.catch((err: any) => console.log(err));
