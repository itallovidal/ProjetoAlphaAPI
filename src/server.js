"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const politics_1 = require("./routes/politics");
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const voters_1 = require("./routes/voters");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: "*",
    methods: ['POST', 'PUT', 'POST', 'PATCH', 'GET'],
    credentials: true,
    allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"]
});
app.register(fastify_multer_1.default.contentParser);
app.get('/', async () => {
    return {
        message: "API no ar!"
    };
});
app.register(politics_1.politicsRoute, {
    prefix: '/politics',
});
app.register(voters_1.votersRoute, {
    prefix: '/voters',
});
// Startando o servidor
app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    console.log(`Server is currently running.`);
});
