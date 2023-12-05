"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPolitics = void 0;
const index_1 = require("../../index");
const firestore_1 = require("firebase/firestore");
async function getAllPolitics() {
    const colRef = (0, firestore_1.collection)(index_1.db, 'politicos');
    const snapshot = await (0, firestore_1.getDocs)(colRef);
    return snapshot.docs.map((doc) => {
        return {
            data: doc.data(),
            collection_id: doc.id
        };
    });
}
exports.getAllPolitics = getAllPolitics;
