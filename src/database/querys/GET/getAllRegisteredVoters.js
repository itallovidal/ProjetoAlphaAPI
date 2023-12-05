"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegisteredVoters = void 0;
const index_1 = require("../../index");
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
async function getAllRegisteredVoters(collection_id, lastDoc) {
    const timestamp = firestore_2.Timestamp.fromMillis((lastDoc * 1000));
    const collectionRef = (0, firestore_1.collection)(index_1.db, `politicos/${collection_id}/cadastrados`);
    const q = (0, firestore_1.query)(collectionRef, (0, firestore_1.orderBy)('created_at'), (0, firestore_1.limit)(5), (0, firestore_1.startAfter)(timestamp));
    const snapshot = await (0, firestore_1.getDocs)(q);
    const allDocs = snapshot.docs.map((doc) => {
        return doc.data();
    });
    return allDocs.filter(data => data.created_at.seconds !== lastDoc);
}
exports.getAllRegisteredVoters = getAllRegisteredVoters;
