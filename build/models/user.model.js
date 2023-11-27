"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const index_1 = require("./../index");
const { DataTypes, Model } = require('sequelize');
class User extends Model {
}
exports.User = User;
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]*/gm,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        validate: {
            is: /^[a-zA-Z]*/gm,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 18,
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            min: 8,
        },
    },
}, {
    sequelize: index_1.sequelize,
});
User.sync({ alter: true })
    .then(() => {
    console.log(User === index_1.sequelize.models.User);
})
    .catch((err) => console.log(err));
