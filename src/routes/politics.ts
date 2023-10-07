import {FastifyInstance} from "fastify";
import {getAllPolitics} from "../database/querys/GET/getAllPolitics";
import {getSpecificPolitic} from "../database/querys/GET/getSpecificPolitic";
import { z } from 'zod'
import {getAllRegisteredUsers} from "../database/querys/GET/getAllRegisteredUsers";
import {registerUser} from "../database/querys/POST/registerUser";
import {getCountRegisteredUsers} from "../database/querys/GET/getCountRegisteredUsers";
import {upload} from "../multer/multerConfig";

import {ref, uploadBytes,  getDownloadURL} from 'firebase/storage'
import {storage} from '../database'
import {createPolitc} from "../database/querys/POST/createPolitc";



const politicQuerySchema = z.object({
    name: z.string(),
    password: z.string()
})

const firebaseIdCollection = z.object({
    collection_id: z.string().min(15)
})

const userSchema = z.object({
    nome:   z.string()
        .min(3, {message:"Mínimo de 3 caracteres."}),
    sobrenome: z.string()
        .min(3, {message:"Mínimo de 3 caracteres."}),
    data_nascimento: z.string(),
    email: z.string()
        .email({message: 'email inválido.'}),
    telefone: z.string()
        .nonempty({message:"Digite o número de celular."}),

    endereco: z.object({
        cep:   z.string().min(8, {message: 'CEP precisa de 8 caracteres.'})
            .max(8,{message: 'Máximo de 8 caracteres.'})
            .regex(/\d{5}\d{3}/, {message: 'Digite um cep válido'}),
        bairro: z.string()
            .min(3, {message:"Mínimo de 3 caracteres."}),
        uf: z.string({
            required_error: 'Escreva o uf'
        }).min(2, {message: 'Mínimo de 2 caracteres.'})
            .max(2, {message: 'Máximo de 2 caracteres.'}),
        rua: z.string({
            required_error: 'Digite a rua, por favor.'
        }).min(3,  {message: 'Pelo menos 3 caracteres.'}),
        cidade: z.string().nonempty({message: 'Por favor, coloque a cidade.'})
    })
})

const createPolitcSchema = z.object({
    email: z.string(),
    nome: z.string(),
    senha: z.string(),
    telefone: z.string(),
    nome_partido: z.string(),
    sigla_partido: z.string(),
})

export interface IUser extends z.infer<typeof userSchema>{}

export async function politicsRoute(app: FastifyInstance){
    // pega as informacões de todos os politicos
    app.get(`/`, async ()=>{
        const docs = await getAllPolitics()
        return {
            docs
        }
    })

    // pega informacoes de um politico específico
    app.post('/:id', async (request, reply)=>{
        const {name, password} = politicQuerySchema.parse(request.body)
        const doc = await getSpecificPolitic(name, password).catch(()=>{
            return reply.status(404).send()
        })

        return doc
    })

    // pega todos os usuários cadastrados de um político específico
    // OBS.: fornecer o id da colecão
    app.get('/:collection_id/registers', async (request)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const docs = await getAllRegisteredUsers(collection_id)

        return {
            docs
        }
    })

    // rota de POST de usuário
    app.post('/:collection_id/registration', async (request, response)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const user = userSchema.parse(request.body)
        await registerUser(collection_id, user)
        response.status(201)
        return response.send()
    })

    // rota get
    app.get('/:collection_id/registerCount', async (request)=>{
        const {collection_id} = firebaseIdCollection.parse(request.params)
        const count = await getCountRegisteredUsers(collection_id)

        return count
    })

    app.post('/create',
        {
            preHandler: upload.single('qrCode')
        },
        async (request, reply)=>{
            const body = createPolitcSchema.parse(request.body)

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
                    nome: body.nome_partido,
                    sigla: body.sigla_partido,
                }
            })

            reply.status(201)
            return {
                message: "político criado certinho"
            }
    })
}