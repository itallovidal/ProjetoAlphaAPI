import fastify from "fastify";
import {politicsRoute} from "./routes/politics";
import cors from "@fastify/cors";
import multer from 'fastify-multer'
const app = fastify()

app.register(cors, {
    origin: "*",
    methods: ['POST', 'PUT', 'POST', 'PATCH', 'GET'],
    credentials: true,
    allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"]
})

app.register(multer.contentParser)

// registro de rotas
app.register(politicsRoute, {
    prefix: '/politics',
})


// Startando o servidor
app.listen({
    port: 3333
}).then(()=>{
    console.log(`Server is currently running.`)
})