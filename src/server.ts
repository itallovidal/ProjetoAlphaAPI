import fastify from "fastify";
import {politicsRoute} from "./routes/politics";
import cors from "@fastify/cors";
import multer from 'fastify-multer'
import {votersRoute} from "./routes/voters";

const app = fastify()

app.register(cors, {
    origin: "*",
    methods: ['POST', 'PUT', 'POST', 'PATCH', 'GET'],
    credentials: true,
    allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"]
})

app.register(multer.contentParser)

app.get('/', async ()=>{
    return {
        message: "API no ar!"
    }
})

app.register(politicsRoute, {
    prefix: '/politics',
})

app.register(votersRoute,{
    prefix: '/voters',
})

// Startando o servidor
app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(()=>{
    console.log(`Server is currently running.`)
})