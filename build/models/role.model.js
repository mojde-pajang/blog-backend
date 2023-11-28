"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const index_1 = require("./../index");
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
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    write: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: index_1.sequelize,
});
Role.sync({ alter: true })
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
    console.log(Role === index_1.sequelize.models.Role, 'Role model created');
})
    .catch((err) => console.log(err));
