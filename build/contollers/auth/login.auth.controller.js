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
exports.loginController = void 0;
const __1 = require("../..");
const user_model_1 = require("../../models/user.model");
const loginController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        const user = yield user_model_1.User.findOne({ raw: true, where: { email } });
        if (user) {
            const result = yield __1.fastify.bcrypt.compare(password, user.password);
            if (result) {
                return reply.status(200).send({ message: user });
            }
        }
        return reply.status(400).send({ message: 'Invalid credential' });
    }
    catch (error) {
        __1.fastify.log.error(error);
    }
});
exports.loginController = loginController;
