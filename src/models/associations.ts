import { Sequelize } from 'sequelize';

export async function defineAssociations(sequelize: Sequelize) {
	const { Role, User, Post, Gallery } = sequelize.models;
	console.log(222, sequelize.models);
	Role.hasMany(User);
	User.belongsTo(Role);

	User.hasMany(Post);
	Post.belongsTo(User);

	Gallery.hasOne(Post);
	Post.belongsTo(Gallery);

	// Sync the Role model with the database
	try {
		await sequelize.sync({ alter: true });
	} catch (error) {
		console.log(error);
		throw new Error('Problem in synchronization!');
	}
}
