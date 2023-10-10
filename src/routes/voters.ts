import {getCountRegisteredVoters} from "../database/querys/GET/getCountRegisteredVoters";
import {getAllRegisteredVoters} from "../database/querys/GET/getAllRegisteredVoters";
import {registerVoter} from "../database/querys/POST/registerVoter";

import {firebaseIdCollection, voterSchema} from "../@types/schemas";
import {FastifyInstance} from "fastify";

export async function votersRoute(app: FastifyInstance){
    // GET de usuários cadastrados em um político específico
    // OBS.: fornecer o id da coleção do político
    app.get('/:collection_id', async (request)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const docs = await getAllRegisteredVoters(collection_id)
        return {
            docs
        }
    })

    // POST de um votante em uma colecao (criação)
    app.post('/:collection_id', async (request, response)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const user = voterSchema.parse(request.body)
        await registerVoter(collection_id, user)
        response.status(201)
        return response.send()
    })

    // GET da quantidade de registros
    app.get('/:collection_id/votersCount', async (request)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const count = await getCountRegisteredVoters(collection_id)

        return count
    })
}