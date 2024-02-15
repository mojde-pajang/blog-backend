import { initializeUserModel } from '../models/user.model';
import { initializeRoleModel } from '../models/role.model'; // Adjust the path accordingly
import { defineAssociations } from '../models/associations'; // Adjust the path accordingly
import { initializePostModel } from '../models/post.model';
import { initializeGalleryModel } from '../models/gallery.model';
import { initializePermissionModel } from '../models/permission.model';
export async function dbInit(sequelize: any) {
	// Initialize the User and Role models
	initializeUserModel(sequelize);
	initializeRoleModel(sequelize);
	initializePostModel(sequelize);
	initializeGalleryModel(sequelize);
	initializePermissionModel(sequelize);

	// Define associations
	await defineAssociations(sequelize);
}
