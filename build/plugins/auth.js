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
const fp = require('fastify-plugin');
module.exports = fp(function (fastify, opts, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const models = fastify.sequelize;
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
                    const user = yield models.User.findOne({ where: { email: email }, include: models.Role });
                    //return (request.isAdmin = 'Admin' === user.Role.roleName);
                }
                catch (err) {
                    reply.status(401).send(err);
                }
            });
        });
        done();
    });
});
