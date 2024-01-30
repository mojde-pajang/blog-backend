"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const index_1 = require("./../index");
const permission_model_1 = require("./permission.model");
const { DataTypes, Model } = require('sequelize');
class Role extends Model {
}
exports.Role = Role;
Role.init({
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
}, {
    sequelize: index_1.sequelize,
});
Role.sync({ alter: true })
    .then(() => {
    permission_model_1.Permission.belongsToMany(Role, { through: 'rolePermission' });
    Role.belongsToMany(permission_model_1.Permission, { through: 'rolePermission' });
    console.log(Role === index_1.sequelize.models.Role, 'Role model created');
})
    .catch((err) => console.log(err));
