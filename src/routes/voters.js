"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votersRoute = void 0;
const getCountRegisteredVoters_1 = require("../database/querys/GET/getCountRegisteredVoters");
const getAllRegisteredVoters_1 = require("../database/querys/GET/getAllRegisteredVoters");
const registerVoter_1 = require("../database/querys/POST/registerVoter");
const schemas_1 = require("../@types/schemas");
const getPoliticByCollection_1 = require("../database/querys/GET/getPoliticByCollection");
async function votersRoute(app) {
    // GET de usuários cadastrados em um político específico
    // OBS.: fornecer o id da coleção do político
    app.get('/:collection_id/:lastDoc', async (request, reply) => {
        const getVotersParsed = schemas_1.getVotersSchema.safeParse(request.params);
        console.log(request.params);
        if (getVotersParsed.success) {
            const { collection_id, lastDoc } = getVotersParsed.data;
            await (0, getPoliticByCollection_1.getPoliticByCollection)(collection_id)
                .catch(() => {
                reply.status(400).send({
                    message: "Político não existe no banco. Você está tentando capturar votantes de um político inexistente?",
                    status: 400
                });
            });
            const docs = await (0, getAllRegisteredVoters_1.getAllRegisteredVoters)(collection_id, lastDoc);
            return {
                docs
            };
        }
        reply.status(400).send({
            message: "ID da coleção enviada errado. Ou falta o start.",
            status: 400
        });
    });
    // POST de um votante em uma colecao (criação)
    app.post('/:collection_id', async (request, reply) => {
        const collectionParsed = schemas_1.firebaseIdCollection.safeParse(request.params);
        const userParsed = schemas_1.voterSchema.safeParse(request.body);
        if (collectionParsed.success) {
            if (userParsed.success) {
                const { collection_id } = collectionParsed.data;
                await (0, getPoliticByCollection_1.getPoliticByCollection)(collection_id)
                    .catch(() => {
                    reply.status(400).send({
                        message: "Político não existe no banco. Você está tentando adicionar um votante em um político inexistente?",
                        status: 400
                    });
                });
                let user = userParsed.data;
                if (user.endereco.cep === "") {
                    user.endereco.cep = null;
                }
                if (user.endereco.rua === "") {
                    user.endereco.rua = null;
                }
                if (user.endereco.bairro === "") {
                    user.endereco.bairro = null;
                }
                await (0, registerVoter_1.registerVoter)(collection_id, user).catch(() => {
                    reply.status(400).send({
                        message: "Erro no cadastro do votante na coleção do político.",
                        status: 400
                    });
                });
                reply.status(201).send({
                    message: "Usuário cadastrado.",
                    status: 201
                });
            }
            reply.status(400).send({
                message: "JSON com as informações do usuário enviado errado.",
                status: 400
            });
        }
        reply.status(400).send({
            message: "ID da coleção enviada errado.",
            status: 400
        });
    });
    // GET da quantidade de registros
    app.get('/:collection_id/votersCount', async (request, reply) => {
        const collectionParsed = schemas_1.firebaseIdCollection.safeParse(request.params);
        if (collectionParsed.success) {
            const { collection_id } = collectionParsed.data;
            return await (0, getCountRegisteredVoters_1.getCountRegisteredVoters)(collection_id).catch(() => {
                reply.status(500).send({
                    status: 500,
                    message: "Erro ao capturar a quantidade de votantes."
                });
            });
        }
        reply.status(400).send({
            status: 400,
            message: "ID Da coleção errado. Você está na rota certa?"
        });
    });
}
exports.votersRoute = votersRoute;
