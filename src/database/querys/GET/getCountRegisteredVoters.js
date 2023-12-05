"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountRegisteredVoters = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function getCountRegisteredVoters(collection_id) {
    const colRef = (0, firestore_1.collection)(index_1.db, `politicos/${collection_id}/cadastrados`);
    const snapshot = await (0, firestore_1.getCountFromServer)(colRef);
    return snapshot.data().count;
}
exports.getCountRegisteredVoters = getCountRegisteredVoters;
