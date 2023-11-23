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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Import the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
require("dotenv/config");
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const fastify = (0, fastify_1.default)({
    logger: true,
});
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});
// Declare a route
fastify.get('/', function handler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return { hello: 'world' };
    });
});
// Run the server!
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
fastify
    .listen({ port })
    .then(() => {
    return sequelize.authenticate();
})
    .then(() => {
    console.log('Connection has been established successfully.');
    console.log('server runs in http://localhost:3000');
})
    .catch((err) => {
    fastify.log.error(err);
});
