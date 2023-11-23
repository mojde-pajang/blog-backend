"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require('dotenv').config();
// Import the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
require("dotenv/config");
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const fastify = (0, fastify_1.default)({
    logger: true,
});
exports.sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});
// Declare a route
fastify.register(require('./routes'));
// Run the server!
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
fastify
    .listen({ port })
    .then(() => {
    return exports.sequelize.authenticate();
})
    .then(() => {
    console.log('Connection has been established successfully.');
    console.log('server runs in http://localhost:3000');
})
    .catch((err) => {
    fastify.log.error(err);
});
