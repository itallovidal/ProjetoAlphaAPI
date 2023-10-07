import {FastifyInstance} from "fastify";

import {getSpecificPolitic} from "../database/querys/GET/getSpecificPolitic";
import {getAllPolitics} from "../database/querys/GET/getAllPolitics";
import {createPolitc} from "../database/querys/POST/createPolitc";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {storage} from '../database'

import {upload} from "../multer/multerConfig";
import {createPoliticSchema, politicQuerySchema,} from "./schemas";


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
            preHandler: upload.single('partido_qrCode')
        },
        async (request, reply)=>{
            const body = createPoliticSchema.parse(request.body)

            const image = request.file
            console.log('=>')
            console.log(image)

            const fileType = image.mimetype.slice(6)
            const storageRef = ref(storage, `politicos/${crypto.randomUUID()}.${fileType}`)

            console.log('criou ref do armazenamento')

            const snapshot = await  uploadBytes(storageRef, image.buffer)
            const url = await getDownloadURL(snapshot.ref)

            await createPolitc({
                email: body.email,
                nome: body.nome,
                senha: body.senha,
                telefone: body.telefone,
                partido:{
                    img_qrCode: url,
                    img_logo: '',
                    nome: body.partido_nome,
                    sigla: body.partido_sigla,
                }
            })

            reply.status(201)
            return {
                message: "político criado certinho"
            }
    })
}