"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.politicsRoute = void 0;
const getPoliticById_1 = require("../database/querys/GET/getPoliticById");
const getAllPolitics_1 = require("../database/querys/GET/getAllPolitics");
const createPolitc_1 = require("../database/querys/POST/createPolitc");
const multerConfig_1 = require("../multer/multerConfig");
const schemas_1 = require("../@types/schemas");
const storeFile_1 = require("../database/querys/POST/storeFile");
const loginPolitic_1 = require("../database/querys/POST/loginPolitic");
const createQrCode_1 = require("../utilities/createQrCode");
async function politicsRoute(app) {
    app.get('/teste', () => {
        return "teste!";
    });
    // GET de todos os políticos
    app.get(`/`, async (request, reply) => {
        const docs = await (0, getAllPolitics_1.getAllPolitics)().catch(() => {
            reply.status(500).send({
                status: 500,
                message: "Erro ao se conectar com o firebase."
            });
        });
        return {
            docs
        };
    });
    // GET de um político por um ID
    app.get('/:id', async (request, reply) => {
        const parsedData = schemas_1.searchPoliticSchema.safeParse(request.params);
        if (parsedData.success) {
            const { id } = parsedData.data;
            const data = await (0, getPoliticById_1.getPoliticById)(id)
                .catch(() => {
                console.log('Político não encontrado no banco.');
                reply.status(404)
                    .send({
                    status: 404,
                    message: "Político não encontrado no banco."
                });
            });
            reply.status(200);
            return data;
        }
        reply.status(400)
            .send({
            status: 400,
            message: "UUID fornecido errado."
        });
    });
    // Login com nome e senha
    app.post('/login', async (request, reply) => {
        const loginQueryParsed = schemas_1.loginQuerySchema.safeParse(request.body);
        if (loginQueryParsed.success) {
            const { email, password } = loginQueryParsed.data;
            return await (0, loginPolitic_1.loginPolitic)(email, password)
                .catch((e) => {
                if (typeof e.cause === 'object' && e.cause && "userNotFound" in e.cause) {
                    if (e.cause.userNotFound) {
                        return reply.status(404).send({
                            status: 404,
                            message: "O usuário não foi encontrado."
                        });
                    }
                }
            });
        }
        reply.status(400)
            .send({
            status: 400,
            message: "JSON enviado errado. Campos 'email' e 'password' obrigatórios."
        });
    });
    // POST de um político (criação)
    app.post('/', {
        preHandler: multerConfig_1.upload.fields([
            { name: 'profile_image', maxCount: 1 }
        ])
    }, async (request, reply) => {
        const body = schemas_1.createPoliticSchema.parse(request.body);
        const id = crypto.randomUUID();
        const { qrCodeURl, URL } = await (0, createQrCode_1.createQrCode)(id);
        // @ts-ignore
        const profile_image = request.files.profile_image[0];
        const profileImagePath = await (0, storeFile_1.storeFile)(profile_image, id);
        const data = {
            id: id,
            email: body.email.toLowerCase(),
            nome: body.nome,
            senha: body.senha,
            telefone: body.telefone,
            profile_image: profileImagePath,
            qrCode_image: qrCodeURl,
            URLCadastro: URL,
            siteInstitucional: body.siteInstitucional,
            facebook: body.facebook,
            linkedin: body.linkedin,
            instagram: body.instagram,
            youtube: body.youtube,
            partido: {
                nome: body.partido_nome,
                sigla: body.partido_sigla
            },
        };
        await (0, createPolitc_1.createPolitic)(data);
        reply.status(201);
        return {
            message: "político criado certinho"
        };
    });
}
exports.politicsRoute = politicsRoute;
