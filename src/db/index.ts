import { initializeUserModel } from '../models/user.model';
import { initializeRoleModel } from '../models/role.model'; // Adjust the path accordingly
import { defineAssociations } from '../models/associations'; // Adjust the path accordingly
export function dbInit(sequelize: any) {
	// Initialize the User and Role models
	initializeUserModel(sequelize);
	initializeRoleModel(sequelize);

	// Define associations
	defineAssociations(sequelize);
}
