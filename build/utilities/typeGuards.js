"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utilities/typeGuards.ts
var typeGuards_exports = {};
__export(typeGuards_exports, {
  isPolitic: () => isPolitic
});
module.exports = __toCommonJS(typeGuards_exports);
function isPolitic(obj) {
  if (typeof obj !== "object")
    return false;
  if (!("email" in obj) && !("id" in obj) && !("telefone" in obj))
    return false;
  if (!("nome" in obj) && !("senha" in obj))
    return false;
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPolitic
});
