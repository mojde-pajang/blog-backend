import { Sequelize } from 'sequelize';

export function defineAssociations(sequelize: Sequelize) {
	const { Role, User } = sequelize.models;
	Role.hasMany(User);
	User.belongsTo(Role);

	// Sync the Role model with the database
	Role.sync({ alter: true })
		.then(() => {
			console.log(Role === sequelize.models.Role);
		})
		.catch((err: any) => console.log(err));

	User.sync({ alter: true })
		.then(() => {
			console.log(User === sequelize.models.User);
		})
		.catch((err: any) => console.log(err));
}
