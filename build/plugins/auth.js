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
const role_model_1 = require("../models/role.model");
const user_model_1 = require("../models/user.model");
const fp = require('fastify-plugin');
module.exports = fp(function (fastify, opts, done) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.decorate('authenticate', function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield request.jwtVerify();
                }
                catch (err) {
                    reply.send(err);
                }
            });
        });
        fastify.decorate('isAdmin', function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                //const decodedToken = fastify.jwt.decode(token);
                try {
                    const { email } = yield request.jwtDecode();
                    const user = yield user_model_1.User.findOne({ where: { email: email }, include: role_model_1.Role });
                    return (request.isAdmin = 'Admin' === user.Role.roleName);
                }
                catch (err) {
                    reply.status(401).send(err);
                }
            });
        });
        done();
    });
});
