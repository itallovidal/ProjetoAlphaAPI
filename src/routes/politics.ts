import {FastifyInstance} from "fastify";

import {getSpecificPolitic} from "../database/querys/GET/getSpecificPolitic";
import {getAllPolitics} from "../database/querys/GET/getAllPolitics";
import {createPolitic} from "../database/querys/POST/createPolitc";

import {upload} from "../multer/multerConfig";
import {createPoliticSchema, politicQuerySchema,} from "./schemas";
import {storeFile} from "../database/querys/POST/StoreFile";


export async function politicsRoute(app: FastifyInstance){
    // GET de todos os políticos
    app.get(`/`, async ()=>{
        const docs = await getAllPolitics()
        return {
            docs
        }
    })

    // GET de um político específico
    app.post('/login', async (request, reply)=>{
        const {name, password} = politicQuerySchema.parse(request.body)
        return await getSpecificPolitic(name, password)
            .catch(() => {
                return reply.status(404).send()
            })
    })

    // POST de um político (criação)
    app.post('/',
        {
            preHandler: upload.fields([
                {name: 'qrCode_image', maxCount: 1},
                {name: 'profile_image', maxCount: 1}
            ])
        },
        async (request, reply)=>{
            const body = createPoliticSchema.parse(request.body)
            const id = crypto.randomUUID()

            const qrCode_image = request.files.qrCode_image[0]
            const profile_image = request.files.profile_image[0]

            const qrCodePath = await storeFile(qrCode_image, id)
            const profileImagePath = await storeFile(profile_image, id)

            const data = {
                id: id,
                email: body.email,
                nome: body.nome,
                senha: body.senha,
                telefone: body.telefone,
                profile_image: profileImagePath,
                qrCode_image: qrCodePath,
                partido: {
                    nome: body.partido_nome,
                    sigla: body.partido_sigla
                },
            }

            await createPolitic(data)

            reply.status(201)
            return {
                message: "político criado certinho"
            }
    })
}