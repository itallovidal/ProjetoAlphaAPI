"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPolitic = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function loginPolitic(email, password) {
    const colRef = (0, firestore_1.collection)(index_1.db, 'politicos');
    const q = (0, firestore_1.query)(colRef, (0, firestore_1.where)('email', '==', email.toLowerCase()), (0, firestore_1.where)('senha', '==', password));
    try {
        const snapshot = await (0, firestore_1.getDocs)(q);
        return {
            ...snapshot.docs[0].data(),
            collection_id: snapshot.docs[0].id
        };
    }
    catch (e) {
        throw new Error('Usuário não encontrado', {
            cause: { userNotFound: true }
        });
    }
}
exports.loginPolitic = loginPolitic;
