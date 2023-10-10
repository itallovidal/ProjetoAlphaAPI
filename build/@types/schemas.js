"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/@types/schemas.ts
var schemas_exports = {};
__export(schemas_exports, {
  createPoliticSchema: () => createPoliticSchema,
  firebaseIdCollection: () => firebaseIdCollection,
  loginQuerySchema: () => loginQuerySchema,
  searchPoliticSchema: () => searchPoliticSchema,
  voterSchema: () => voterSchema
});
module.exports = __toCommonJS(schemas_exports);
var import_zod = require("zod");
var loginQuerySchema = import_zod.z.object({
  name: import_zod.z.string(),
  password: import_zod.z.string()
});
var firebaseIdCollection = import_zod.z.object({
  collection_id: import_zod.z.string().min(15)
});
var voterSchema = import_zod.z.object({
  nome: import_zod.z.string().min(3, { message: "M\xEDnimo de 3 caracteres." }),
  sobrenome: import_zod.z.string().min(3, { message: "M\xEDnimo de 3 caracteres." }),
  data_nascimento: import_zod.z.string(),
  email: import_zod.z.string().email({ message: "email inv\xE1lido." }),
  telefone: import_zod.z.string().nonempty({ message: "Digite o n\xFAmero de celular." }),
  endereco: import_zod.z.object({
    cep: import_zod.z.string().min(8, { message: "CEP precisa de 8 caracteres." }).max(8, { message: "M\xE1ximo de 8 caracteres." }).regex(/\d{5}\d{3}/, { message: "Digite um cep v\xE1lido" }),
    bairro: import_zod.z.string().min(3, { message: "M\xEDnimo de 3 caracteres." }),
    uf: import_zod.z.string({
      required_error: "Escreva o uf"
    }).min(2, { message: "M\xEDnimo de 2 caracteres." }).max(2, { message: "M\xE1ximo de 2 caracteres." }),
    rua: import_zod.z.string({
      required_error: "Digite a rua, por favor."
    }).min(3, { message: "Pelo menos 3 caracteres." }),
    cidade: import_zod.z.string().nonempty({ message: "Por favor, coloque a cidade." })
  })
});
var createPoliticSchema = import_zod.z.object({
  email: import_zod.z.string(),
  nome: import_zod.z.string(),
  senha: import_zod.z.string(),
  telefone: import_zod.z.string(),
  partido_nome: import_zod.z.string(),
  partido_sigla: import_zod.z.string(),
  siteInstitucional: import_zod.z.string(),
  facebook: import_zod.z.string(),
  instagram: import_zod.z.string()
});
var searchPoliticSchema = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPoliticSchema,
  firebaseIdCollection,
  loginQuerySchema,
  searchPoliticSchema,
  voterSchema
});
