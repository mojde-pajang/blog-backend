import { sequelize } from './../index';
import { User } from './user.model';
const { DataTypes, Model } = require('sequelize');

export class Post extends Model {}

Post.init(
	{
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
	},
	{
		sequelize,
	},
);

User.hasMany(Post);
Post.belongsTo(User);

Post.sync({ alter: true })
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
		console.log(Post === sequelize.models.Post, 'Post model created');
	})
	.catch((err: any) => console.log(err));
