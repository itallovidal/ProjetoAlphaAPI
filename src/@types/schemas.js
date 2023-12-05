"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPoliticSchema = exports.createPoliticSchema = exports.voterSchema = exports.getVotersSchema = exports.firebaseIdCollection = exports.loginQuerySchema = void 0;
const zod_1 = require("zod");
exports.loginQuerySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.firebaseIdCollection = zod_1.z.object({
    collection_id: zod_1.z.string().min(15)
});
exports.getVotersSchema = zod_1.z.object({
    collection_id: zod_1.z.string().min(15),
    lastDoc: zod_1.z.coerce.number().min(0)
});
exports.voterSchema = zod_1.z.object({
    nome: zod_1.z.string()
        .min(3, { message: "Mínimo de 3 caracteres." }),
    sobrenome: zod_1.z.string()
        .min(3, { message: "Mínimo de 3 caracteres." }),
    data_nascimento: zod_1.z.string(),
    email: zod_1.z.string()
        .email({ message: 'email inválido.' }),
    telefone: zod_1.z.string()
        .nonempty({ message: "Digite o número de celular." }),
    endereco: zod_1.z.object({
        cep: zod_1.z.string().or(zod_1.z.null()),
        bairro: zod_1.z.string().or(zod_1.z.null()),
        rua: zod_1.z.string().or(zod_1.z.null()),
        uf: zod_1.z.string({
            required_error: 'Escreva o uf'
        }).min(2, { message: 'Mínimo de 2 caracteres.' })
            .max(2, { message: 'Máximo de 2 caracteres.' }),
        cidade: zod_1.z.string().nonempty({ message: 'Por favor, coloque a cidade.' })
    })
});
exports.createPoliticSchema = zod_1.z.object({
    email: zod_1.z.string(),
    nome: zod_1.z.string(),
    senha: zod_1.z.string(),
    telefone: zod_1.z.string(),
    partido_nome: zod_1.z.string(),
    partido_sigla: zod_1.z.string(),
    siteInstitucional: zod_1.z.string().or(zod_1.z.null()).default(null),
    facebook: zod_1.z.string().or(zod_1.z.null()).default(null),
    linkedin: zod_1.z.string().or(zod_1.z.null()).default(null),
    youtube: zod_1.z.string().or(zod_1.z.null()).default(null),
    instagram: zod_1.z.string().or(zod_1.z.null()).default(null),
});
exports.searchPoliticSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
