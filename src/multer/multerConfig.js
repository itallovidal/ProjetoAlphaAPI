"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fastify_multer_1 = __importDefault(require("fastify-multer"));
exports.upload = (0, fastify_multer_1.default)({
    dest: `uploads/`,
    storage: fastify_multer_1.default.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
});
