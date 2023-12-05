"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPolitic = void 0;
function isPolitic(obj) {
    if (typeof obj !== 'object')
        return false;
    if (!("email" in obj) && !("id" in obj) && !("telefone" in obj))
        return false;
    if (!("nome" in obj) && !("senha" in obj))
        return false;
    return true;
}
exports.isPolitic = isPolitic;
