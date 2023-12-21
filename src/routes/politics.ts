import {FastifyInstance} from "fastify";

import {getPoliticById} from "../database/querys/GET/getPoliticById";
import {getAllPolitics} from "../database/querys/GET/getAllPolitics";
import {createPolitic} from "../database/querys/POST/createPolitc";

import {upload} from "../multer/multerConfig";
import {
    politicSchema,
    loginQuerySchema,
    searchPoliticSchema,
    collectionSchema,
    updatePoliticSchema,
} from "../@types/schemas";
import {storeFile} from "../database/querys/POST/storeFile";
import {loginPolitic} from "../database/querys/POST/loginPolitic";
import {createQrCode} from "../utilities/createQrCode";
import {changePoliticData} from "../database/querys/POST/changePoliticData";


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
            const {email, password} = loginQueryParsed.data
            return await loginPolitic(email, password)
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
                message: "JSON enviado errado. Campos 'email' e 'password' obrigatórios."
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
            const body = politicSchema.parse(request.body)
            const id = crypto.randomUUID()

            const {qrCodeURl, URL} = await createQrCode(id)

            // @ts-ignore
            const profile_image = request.files.profile_image[0]
            const profileImagePath = await storeFile(profile_image, id)

            const data = {
                id: id,
                email: body.email.toLowerCase(),
                nome: body.nome,
                senha: body.senha,
                telefone: body.telefone,
                profile_image: profileImagePath,
                qrCode_image: qrCodeURl,
                URLCadastro: URL,
                siteInstitucional: body.siteInstitucional,
                facebook: body.facebook,
                linkedin: body.linkedin,
                instagram: body.instagram,
                youtube: body.youtube,
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

    app.put('/updateData/:id', async (request, reply)=>{
        const body = updatePoliticSchema.safeParse(request.body)
        const param = collectionSchema.safeParse(request.params)

        if(!body.success){
            return reply.status(400)
                        .send({
                message: "Payload com dados errados."
            })
        }

        if(!param.success){
            return reply.status(400)
                .send({
                    message: "Id de usuário fornecido errado."
                })
        }


        const { data } = body

        const newInfo = {
            email: data.email.toLowerCase(),
            nome: data.nome,
            senha: data.senha,
            telefone: data.telefone,
            siteInstitucional: data.siteInstitucional,
            facebook: data.facebook,
            linkedin: data.linkedin,
            instagram: data.instagram,
            youtube: data.youtube,
            partido: {
                nome: data.partido_nome,
                sigla: data.partido_sigla
            },
        } as const

        try{
            await changePoliticData(newInfo, param.data.id)

            const updatedPolitic = await getPoliticById(data.id)

            return reply.status(202).send(updatedPolitic)
        }catch (e) {
            if(e instanceof Error)
                return reply.status(500).send({
                    message: "Erro no cadastro de informacões..",
                    error: e.message
            })
        }
    })
}