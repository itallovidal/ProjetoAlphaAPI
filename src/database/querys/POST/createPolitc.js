"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolitic = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("../../index");
async function createPolitic(data) {
    const usersCollection = (0, firestore_1.collection)(index_1.db, "politicos");
    const response = await (0, firestore_1.addDoc)(usersCollection, {
        ...data,
        created_at: (0, firestore_1.serverTimestamp)()
    });
    return response;
}
exports.createPolitic = createPolitic;
