"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));

// src/database/querys/GET/getPoliticById.ts
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

// src/database/querys/GET/getPoliticById.ts
async function getPoliticById(id) {
  const colRef = (0, import_firestore2.collection)(db, "politicos");
  const q = (0, import_firestore2.query)(colRef, (0, import_firestore2.where)("id", "==", id));
  const snapshot = await (0, import_firestore2.getDocs)(q);
  return {
    ...snapshot.docs[0].data(),
    collection_id: snapshot.docs[0].id
  };
}

// src/database/querys/GET/getAllPolitics.ts
var import_firestore3 = require("firebase/firestore");
async function getAllPolitics() {
  const colRef = (0, import_firestore3.collection)(db, "politicos");
  const snapshot = await (0, import_firestore3.getDocs)(colRef);
  return snapshot.docs.map((doc2) => {
    return {
      data: doc2.data(),
      collection_id: doc2.id
    };
  });
}

// src/database/querys/POST/createPolitc.ts
var import_firestore4 = require("firebase/firestore");
async function createPolitic(data) {
  const usersCollection = (0, import_firestore4.collection)(db, "politicos");
  const response = await (0, import_firestore4.addDoc)(usersCollection, data);
  return response;
}

// src/multer/multerConfig.ts
var import_fastify_multer = __toESM(require("fastify-multer"));
var upload = (0, import_fastify_multer.default)({
  dest: `uploads/`,
  storage: import_fastify_multer.default.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

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

// src/database/querys/POST/storeFile.ts
var import_storage2 = require("firebase/storage");
async function storeFile(image, politic_id) {
  console.log(image);
  const fileType = image.mimetype.slice(6);
  const storageRef = (0, import_storage2.ref)(storage, `politicos/${politic_id}/${crypto.randomUUID()}.${fileType}`);
  const snapshot = await (0, import_storage2.uploadBytes)(storageRef, image.buffer);
  return await (0, import_storage2.getDownloadURL)(snapshot.ref);
}

// src/database/querys/POST/loginPolitic.ts
var import_firestore5 = require("firebase/firestore");
async function loginPolitic(name, password) {
  const colRef = (0, import_firestore5.collection)(db, "politicos");
  const q = (0, import_firestore5.query)(
    colRef,
    (0, import_firestore5.where)("nome", "==", name),
    (0, import_firestore5.where)("senha", "==", password)
  );
  try {
    const snapshot = await (0, import_firestore5.getDocs)(q);
    return {
      ...snapshot.docs[0].data(),
      collection_id: snapshot.docs[0].id
    };
  } catch (e) {
    throw new Error("Usu\xE1rio n\xE3o encontrado", {
      cause: { userNotFound: true }
    });
  }
}

// src/utilities/createQrCode.ts
async function createQrCode(id) {
  const response = await fetch(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://projeto-alpha-site.vercel.app/${id}`);
  return response.url;
}

// src/routes/politics.ts
async function politicsRoute(app3) {
  app3.get(`/`, async (request, reply) => {
    const docs = await getAllPolitics().catch(() => {
      reply.status(500).send({
        status: 500,
        message: "Erro ao se conectar com o firebase."
      });
    });
    return {
      docs
    };
  });
  app3.get("/:id", async (request, reply) => {
    const parsedData = searchPoliticSchema.safeParse(request.params);
    if (parsedData.success) {
      const { id } = parsedData.data;
      const data = await getPoliticById(id).catch(() => {
        console.log("Pol\xEDtico n\xE3o encontrado no banco.");
        reply.status(404).send({
          status: 404,
          message: "Pol\xEDtico n\xE3o encontrado no banco."
        });
      });
      reply.status(200);
      return data;
    }
    reply.status(400).send({
      status: 400,
      message: "UUID fornecido errado."
    });
  });
  app3.post("/login", async (request, reply) => {
    const loginQueryParsed = loginQuerySchema.safeParse(request.body);
    if (loginQueryParsed.success) {
      const { name, password } = loginQueryParsed.data;
      return await loginPolitic(name, password).catch((e) => {
        if (typeof e.cause === "object" && e.cause && "userNotFound" in e.cause) {
          if (e.cause.userNotFound) {
            return reply.status(404).send({
              status: 404,
              message: "O usu\xE1rio n\xE3o foi encontrado."
            });
          }
        }
      });
    }
    reply.status(400).send({
      status: 400,
      message: "JSON enviado errado. Campos 'name' e 'password' obrigat\xF3rios."
    });
  });
  app3.post(
    "/",
    {
      preHandler: upload.fields([
        { name: "profile_image", maxCount: 1 }
      ])
    },
    async (request, reply) => {
      const body = createPoliticSchema.parse(request.body);
      const id = crypto.randomUUID();
      const qrCodePath = await createQrCode(id);
      const profile_image = request.files.profile_image[0];
      const profileImagePath = await storeFile(profile_image, id);
      const data = {
        id,
        email: body.email,
        nome: body.nome,
        senha: body.senha,
        telefone: body.telefone,
        profile_image: profileImagePath,
        qrCode_image: qrCodePath,
        siteInstitucional: body.siteInstitucional,
        facebook: body.facebook,
        instagram: body.instagram,
        partido: {
          nome: body.partido_nome,
          sigla: body.partido_sigla
        }
      };
      await createPolitic(data);
      reply.status(201);
      return {
        message: "pol\xEDtico criado certinho"
      };
    }
  );
}

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var import_fastify_multer2 = __toESM(require("fastify-multer"));

// src/database/querys/GET/getCountRegisteredVoters.ts
var import_firestore6 = require("firebase/firestore");
async function getCountRegisteredVoters(collection_id) {
  const colRef = (0, import_firestore6.collection)(db, `politicos/${collection_id}/cadastrados`);
  const snapshot = await (0, import_firestore6.getCountFromServer)(colRef);
  return snapshot.data().count;
}

// src/database/querys/GET/getAllRegisteredVoters.ts
var import_firestore7 = require("firebase/firestore");
async function getAllRegisteredVoters(collection_id) {
  const colRef = (0, import_firestore7.collection)(db, `politicos/${collection_id}/cadastrados`);
  const snapshot = await (0, import_firestore7.getDocs)(colRef);
  return snapshot.docs.map((doc2) => {
    return doc2.data();
  });
}

// src/database/querys/POST/registerVoter.ts
var import_firestore8 = require("firebase/firestore");
async function registerVoter(collection_id, user) {
  const colRef = (0, import_firestore8.collection)(db, `politicos/${collection_id}/cadastrados`);
  await (0, import_firestore8.addDoc)(colRef, {
    ...user,
    id: crypto.randomUUID()
  });
  return true;
}

// src/database/querys/GET/getPoliticByCollection.ts
var import_firestore9 = require("firebase/firestore");
async function getPoliticByCollection(id_collection) {
  const docRef = (0, import_firestore9.doc)(db, "politicos", id_collection);
  const snapshot = await (0, import_firestore9.getDoc)(docRef);
  if (snapshot.data()) {
    return snapshot.data();
  }
  throw new Error("Pol\xEDtico n\xE3o encontrado.");
}

// src/routes/voters.ts
async function votersRoute(app3) {
  app3.get("/:collection_id", async (request, reply) => {
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
  app3.post("/:collection_id", async (request, reply) => {
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
  app3.get("/:collection_id/votersCount", async (request, reply) => {
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

// src/server.ts
var app2 = (0, import_fastify.default)();
app2.register(import_cors.default, {
  origin: "*",
  methods: ["POST", "PUT", "POST", "PATCH", "GET"],
  credentials: true,
  allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"]
});
app2.register(import_fastify_multer2.default.contentParser);
app2.register(politicsRoute, {
  prefix: "/politics"
});
app2.register(votersRoute, {
  prefix: "/voters"
});
app2.listen({
  port: 3333
}).then(() => {
  console.log(`Server is currently running.`);
});
