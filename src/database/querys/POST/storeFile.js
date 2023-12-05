"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeFile = void 0;
const storage_1 = require("firebase/storage");
const index_1 = require("../../index");
async function storeFile(image, politic_id) {
    console.log(image);
    const fileType = image.mimetype.slice(6);
    const storageRef = (0, storage_1.ref)(index_1.storage, `politicos/${politic_id}/${crypto.randomUUID()}.${fileType}`);
    const snapshot = await (0, storage_1.uploadBytes)(storageRef, image.buffer);
    return await (0, storage_1.getDownloadURL)(snapshot.ref);
}
exports.storeFile = storeFile;
