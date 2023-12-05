"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoliticById = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function getPoliticById(id) {
    const colRef = (0, firestore_1.collection)(index_1.db, 'politicos');
    const q = (0, firestore_1.query)(colRef, (0, firestore_1.where)('id', '==', id));
    const snapshot = await (0, firestore_1.getDocs)(q);
    return {
        ...snapshot.docs[0].data(),
        collection_id: snapshot.docs[0].id
    };
}
exports.getPoliticById = getPoliticById;
