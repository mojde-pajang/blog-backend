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
exports.sequelize = exports.uploadsFolder = exports.fastify = void 0;
require('dotenv').config();
// Import the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
const fastify_bcrypt_1 = require("fastify-bcrypt");
const jwt_1 = require("@fastify/jwt");
const cors_1 = __importDefault(require("@fastify/cors"));
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const { Sequelize } = require('sequelize');
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
exports.fastify.register(require('fastify-axios'));
exports.fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });
// Set up the uploads folder
exports.uploadsFolder = path_1.default.join(__dirname, '..', 'public/uploads');
fs.ensureDirSync(exports.uploadsFolder);
// Serve the uploads folder as a static directory
exports.fastify.register(require('@fastify/static'), {
    root: exports.uploadsFolder,
    prefix: '/uploads',
});
exports.sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});
// Declare a plugins
exports.fastify.register(require('./plugins/auth'));
// Declare a routes
exports.fastify.register(require('./routes'));
// Run the server!
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
exports.fastify
    .listen({ port })
    .then(() => {
    console.log(`*********************************************\n*********************************************\n*********************************************`);
    return exports.sequelize.authenticate();
})
    .then(() => {
    console.log(`Connection has been established successfully.`);
    console.log('server runs in http://localhost:3000');
    console.log(`*********************************************\n*********************************************\n*********************************************`);
})
    .catch((err) => {
    exports.fastify.log.error(err);
});
