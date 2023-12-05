"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQrCode = void 0;
async function createQrCode(id) {
    const response = await fetch(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://projeto-alpha-site.vercel.app/${id}`);
    return {
        qrCodeURl: response.url,
        URL: `https://projeto-alpha-site.vercel.app/${id}`
    };
}
exports.createQrCode = createQrCode;
