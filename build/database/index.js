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

// src/database/index.ts
var database_exports = {};
__export(database_exports, {
  db: () => db,
  storage: () => storage
});
module.exports = __toCommonJS(database_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  db,
  storage
});
