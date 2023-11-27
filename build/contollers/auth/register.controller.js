"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const __1 = require("../..");
const user_model_1 = require("../../models/user.model");
const registerController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, age, email, password } = request.body;
    try {
        const userExists = yield user_model_1.User.findOne({ where: { email: email } });
        console.log(123, userExists);
        if (userExists) {
            __1.fastify.log.error('Duplicate user');
            return reply.status(400).send({ message: 'user exists' });
        }
        const hashedPassword = yield __1.fastify.bcrypt.hash(password);
        const newUser = yield user_model_1.User.create({
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword,
        });
        return reply.status(200).send({ newUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerController = registerController;
