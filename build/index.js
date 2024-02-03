"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsFolder = exports.fastify = void 0;
require('dotenv').config();
const fastify_1 = __importDefault(require("fastify"));
const fastify_bcrypt_1 = require("fastify-bcrypt");
const jwt_1 = require("@fastify/jwt");
const cors_1 = __importDefault(require("@fastify/cors"));
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
exports.fastify = (0, fastify_1.default)({
    logger: true,
});
exports.fastify.register(fastify_bcrypt_1.fastifyBcrypt, {
    saltWorkFactor: 12,
});
exports.fastify.register(jwt_1.fastifyJwt, {
    secret: 'supersecret',
});
exports.fastify.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
});
exports.fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });
// Set up the uploads folder
exports.uploadsFolder = path_1.default.join(__dirname, '..', 'public/uploads');
fs.ensureDirSync(exports.uploadsFolder);
// Serve the uploads folder as a static directory
exports.fastify.register(require('@fastify/static'), {
    root: exports.uploadsFolder,
    prefix: '/uploads',
});
// Declare app plugins
exports.fastify.register(require('./plugins/db'));
exports.fastify.register(require('./routes'));
//fastify.register(require('./plugins/auth'));
// Run the server!
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
exports.fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        exports.fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
    console.log(`server runs in ${address}`);
    console.log(`*********************************************\n*********************************************\n*********************************************`);
});
