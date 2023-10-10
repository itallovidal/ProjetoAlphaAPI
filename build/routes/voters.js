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

// src/routes/voters.ts
var voters_exports = {};
__export(voters_exports, {
  votersRoute: () => votersRoute
});
module.exports = __toCommonJS(voters_exports);

// src/database/querys/GET/getCountRegisteredVoters.ts
var import_firestore2 = require("firebase/firestore");

// src/database/index.ts
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
var import_storage = require("firebase/storage");
var firebaseConfig = {
  apiKey: "AIzaSyDwvyJTaEI7Wu11d77IU0DXfXig7Y1OHos",
  authDomain: "projetoalpha-c8d5e.firebaseapp.com",
  projectId: "projetoalpha-c8d5e",
  storageBucket: "projetoalpha-c8d5e.appspot.com",
  messagingSenderId: "1021811883912",
  appId: "1:1021811883912:web:541bf8b257a284db89043d"
};
var app = (0, import_app.initializeApp)(firebaseConfig);
var db = (0, import_firestore.getFirestore)();
var storage = (0, import_storage.getStorage)(app);

// src/database/querys/GET/getCountRegisteredVoters.ts
async function getCountRegisteredVoters(collection_id) {
  const colRef = (0, import_firestore2.collection)(db, `politicos/${collection_id}/cadastrados`);
  const snapshot = await (0, import_firestore2.getCountFromServer)(colRef);
  return snapshot.data().count;
}

// src/database/querys/GET/getAllRegisteredVoters.ts
var import_firestore3 = require("firebase/firestore");
async function getAllRegisteredVoters(collection_id) {
  const colRef = (0, import_firestore3.collection)(db, `politicos/${collection_id}/cadastrados`);
  const snapshot = await (0, import_firestore3.getDocs)(colRef);
  return snapshot.docs.map((doc2) => {
    return doc2.data();
  });
}

// src/database/querys/POST/registerVoter.ts
var import_firestore4 = require("firebase/firestore");
async function registerVoter(collection_id, user) {
  const colRef = (0, import_firestore4.collection)(db, `politicos/${collection_id}/cadastrados`);
  await (0, import_firestore4.addDoc)(colRef, {
    ...user,
    id: crypto.randomUUID()
  });
  return true;
}

// src/@types/schemas.ts
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

// src/database/querys/GET/getPoliticByCollection.ts
var import_firestore5 = require("firebase/firestore");
async function getPoliticByCollection(id_collection) {
  const docRef = (0, import_firestore5.doc)(db, "politicos", id_collection);
  const snapshot = await (0, import_firestore5.getDoc)(docRef);
  if (snapshot.data()) {
    return snapshot.data();
  }
  throw new Error("Pol\xEDtico n\xE3o encontrado.");
}

// src/routes/voters.ts
async function votersRoute(app2) {
  app2.get("/:collection_id", async (request, reply) => {
    const collectionParsed = firebaseIdCollection.safeParse(request.params);
    if (collectionParsed.success) {
      const { collection_id } = collectionParsed.data;
      await getPoliticByCollection(collection_id).catch(() => {
        reply.status(400).send({
          message: "Pol\xEDtico n\xE3o existe no banco. Voc\xEA est\xE1 tentando capturar votantes de um pol\xEDtico inexistente?",
          status: 400
        });
      });
      const docs = await getAllRegisteredVoters(collection_id);
      return {
        docs
      };
    }
    reply.status(400).send({
      message: "ID da cole\xE7\xE3o enviada errado.",
      status: 400
    });
  });
  app2.post("/:collection_id", async (request, reply) => {
    const collectionParsed = firebaseIdCollection.safeParse(request.params);
    const userParsed = voterSchema.safeParse(request.body);
    if (collectionParsed.success) {
      if (userParsed.success) {
        const { collection_id } = collectionParsed.data;
        await getPoliticByCollection(collection_id).catch(() => {
          reply.status(400).send({
            message: "Pol\xEDtico n\xE3o existe no banco. Voc\xEA est\xE1 tentando adicionar um votante em um pol\xEDtico inexistente?",
            status: 400
          });
        });
        const user = userParsed.data;
        await registerVoter(collection_id, user).catch(() => {
          reply.status(400).send({
            message: "Erro no cadastro do votante na cole\xE7\xE3o do pol\xEDtico.",
            status: 400
          });
        });
        reply.status(201).send({
          message: "Usu\xE1rio cadastrado.",
          status: 201
        });
      }
      reply.status(400).send({
        message: "JSON com as informa\xE7\xF5es do usu\xE1rio enviado errado.",
        status: 400
      });
    }
    reply.status(400).send({
      message: "ID da cole\xE7\xE3o enviada errado.",
      status: 400
    });
  });
  app2.get("/:collection_id/votersCount", async (request, reply) => {
    const collectionParsed = firebaseIdCollection.safeParse(request.params);
    if (collectionParsed.success) {
      const { collection_id } = collectionParsed.data;
      return await getCountRegisteredVoters(collection_id).catch(() => {
        reply.status(500).send({
          status: 500,
          message: "Erro ao capturar a quantidade de votantes."
        });
      });
    }
    reply.status(400).send({
      status: 400,
      message: "ID Da cole\xE7\xE3o errado. Voc\xEA est\xE1 na rota certa?"
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  votersRoute
});
