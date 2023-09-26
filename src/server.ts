import fastify from "fastify";
import {politicsRoute} from "./routes/politics";

const app = fastify()

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