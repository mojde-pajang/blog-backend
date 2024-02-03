"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoleModel = void 0;
// user.model.controller.ts
const { DataTypes } = require('sequelize');
function initializeRoleModel(sequelize) {
    // Access the Sequelize instance from the Fastify instance decorator
    const Role = sequelize.define('Role', {
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
    });
    return Role;
}
exports.initializeRoleModel = initializeRoleModel;
