import { Sequelize } from 'sequelize';

export async function defineAssociations(sequelize: Sequelize) {
	const { Role, User, Post, Gallery, Permission } = sequelize.models;

	Role.hasMany(User);
	User.belongsTo(Role);

	Role.belongsToMany(Permission, { through: 'RolePermissions' });
	Permission.belongsToMany(Role, { through: 'RolePermissions' });

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
