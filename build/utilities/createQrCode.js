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

// src/utilities/createQrCode.ts
var createQrCode_exports = {};
__export(createQrCode_exports, {
  createQrCode: () => createQrCode
});
module.exports = __toCommonJS(createQrCode_exports);
async function createQrCode(id) {
  const response = await fetch(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://projeto-alpha-site.vercel.app/${id}`);
  return response.url;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQrCode
});
