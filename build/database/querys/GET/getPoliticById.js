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

// src/database/querys/GET/getPoliticById.ts
var getPoliticById_exports = {};
__export(getPoliticById_exports, {
  getPoliticById: () => getPoliticById
});
module.exports = __toCommonJS(getPoliticById_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPoliticById
});
