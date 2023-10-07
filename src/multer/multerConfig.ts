import multer from 'fastify-multer';

export const upload = multer({
    dest: `uploads/`,
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
})