"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const index_1 = require("./../index");
const { DataTypes, Model, Op } = require('sequelize');
class User extends Model {
}
exports.User = User;
User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 6],
        },
    },
    lastName: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 8,
        },
    },
}, {
    sequelize: index_1.sequelize,
});
User.sync()
    .then(() => {
    console.log(User === index_1.sequelize.models.User);
})
    .catch((err) => console.log(err));
