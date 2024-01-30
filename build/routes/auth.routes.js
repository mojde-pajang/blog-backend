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
const login_auth_controller_1 = require("../contollers/auth/login.auth.controller");
const register_controller_1 = require("../contollers/auth/register.controller");
const me_controller_1 = require("../contollers/user/me.controller");
function auth(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/register', register_controller_1.registerController);
        fastify.post('/login', login_auth_controller_1.loginController);
        fastify.get('/me', {
            onRequest: [fastify.authenticate, fastify.isAdmin],
        }, me_controller_1.meController);
    });
}
module.exports = auth;
