"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoliticByCollection = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function getPoliticByCollection(id_collection) {
    const docRef = (0, firestore_1.doc)(index_1.db, 'politicos', id_collection);
    const snapshot = await (0, firestore_1.getDoc)(docRef);
    if (snapshot.data()) {
        return snapshot.data();
    }
    throw new Error("Político não encontrado.");
}
exports.getPoliticByCollection = getPoliticByCollection;
