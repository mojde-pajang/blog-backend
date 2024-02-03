const sequelizeFastify = require('sequelize-fastify');
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
			type: DataTypes.TEXT,
		},
	},
	{
		sequelizeFastify,
	},
);

Gallery.sync({ alter: true })
	.then(() => {
		console.log(Gallery === sequelizeFastify.models.Gallery, 'Gallery model created');
	})
	.catch((err: any) => console.log(err));
