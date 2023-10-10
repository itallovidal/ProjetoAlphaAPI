import {FastifyInstance} from "fastify";

import {getPoliticById} from "../database/querys/GET/getPoliticById";
import {getAllPolitics} from "../database/querys/GET/getAllPolitics";
import {createPolitic} from "../database/querys/POST/createPolitc";

import {upload} from "../multer/multerConfig";
import {createPoliticSchema, loginQuerySchema, searchPoliticSchema,} from "../@types/schemas";
import {storeFile} from "../database/querys/POST/storeFile";
import {loginPolitic} from "../database/querys/POST/loginPolitic";
import {createQrCode} from "../utilities/createQrCode";


export async function politicsRoute(app: FastifyInstance){
    // GET de todos os políticos
    app.get(`/`, async (request, reply)=>{
        const docs = await getAllPolitics().catch(()=>{
            reply.status(500).send({
                status: 500,
                message: "Erro ao se conectar com o firebase."
            })
        })
        return {
            docs
        }
    })

    // GET de um político por um ID
    app.get('/:id', async(request, reply)=>{
        const parsedData = searchPoliticSchema.safeParse(request.params)

        if(parsedData.success){
            const { id } = parsedData.data
            const data = await getPoliticById(id)
                .catch(() => {
                    console.log('Político não encontrado no banco.')
                    reply.status(404)
                        .send({
                            status: 404,
                            message: "Político não encontrado no banco."
                        })
                })

            reply.status(200)
            return data
        }

        reply.status(400)
        .send({
            status: 400,
            message: "UUID fornecido errado."
        })
    })

    // Login com nome e senha
    app.post('/login', async (request, reply)=>{
        const loginQueryParsed = loginQuerySchema.safeParse(request.body)

        if(loginQueryParsed.success){
            const {name, password} = loginQueryParsed.data
            return await loginPolitic(name, password)
                .catch((e: Error) => {
                    if (typeof e.cause === 'object' && e.cause && "userNotFound" in e.cause) {
                        if (e.cause.userNotFound) {
                            return reply.status(404).send({
                                status: 404,
                                message: "O usuário não foi encontrado."
                            })
                        }
                    }
            })
        }

        reply.status(400)
            .send({
                status: 400,
                message: "JSON enviado errado. Campos 'name' e 'password' obrigatórios."
            })
    })

    // POST de um político (criação)
    app.post('/',
        {
            preHandler: upload.fields([
                {name: 'profile_image', maxCount: 1}
            ])
        },
        async (request, reply)=>{
            const body = createPoliticSchema.parse(request.body)
            const id = crypto.randomUUID()

            const qrCodePath = await createQrCode(id)

            // @ts-ignore
            const profile_image = request.files.profile_image[0]
            const profileImagePath = await storeFile(profile_image, id)

            const data = {
                id: id,
                email: body.email,
                nome: body.nome,
                senha: body.senha,
                telefone: body.telefone,
                profile_image: profileImagePath,
                qrCode_image: qrCodePath,
                siteInstitucional: body.siteInstitucional,
                facebook: body.facebook,
                instagram: body.instagram,
                partido: {
                    nome: body.partido_nome,
                    sigla: body.partido_sigla
                },
            } as const

            await createPolitic(data)

            reply.status(201)
            return {
                message: "político criado certinho"
            }
    })
}