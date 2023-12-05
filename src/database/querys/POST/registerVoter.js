"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVoter = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function registerVoter(collection_id, user) {
    const colRef = (0, firestore_1.collection)(index_1.db, `politicos/${collection_id}/cadastrados`);
    await (0, firestore_1.addDoc)(colRef, {
        ...user,
        id: crypto.randomUUID(),
        created_at: (0, firestore_1.serverTimestamp)()
    });
    return true;
}
exports.registerVoter = registerVoter;
