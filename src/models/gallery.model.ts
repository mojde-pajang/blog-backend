import { sequelize } from './../index';
import { Post } from './post.model';
const { DataTypes, Model } = require('sequelize');

export class Gallery extends Model {}

Gallery.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		imageUrl: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
	},
);

Gallery.sync({ alter: true })
	.then(() => {
		console.log(Gallery === sequelize.models.Gallery, 'Gallery model created');
	})
	.catch((err: any) => console.log(err));
