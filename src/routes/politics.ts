import {FastifyInstance} from "fastify";
import {getAllPolitics} from "../database/querys/getAllPolitics";
import {getSpecificPolitic} from "../database/querys/getSpecificPolitic";
import {z} from 'zod'
import {getAllRegisteredUsers} from "../database/querys/getAllRegisteredUsers";
import {registerUser} from "../database/querys/registerUser";


const politicQuerySchema = z.object({
    id: z.string().uuid()
})

const firebaseIdCollection = z.object({
    id: z.string().min(15)
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
    app.get('/:id', async (request)=>{
        const {id} = politicQuerySchema.parse(request.params)

        const docs = await getSpecificPolitic(id)

        return {
            docs
        }
    })

    // pega todos os usuários cadastrados de um político específico
    app.get('/:id/registers', async (request)=>{
        const {id} = firebaseIdCollection.parse(request.params)
        const docs = await getAllRegisteredUsers(id)

        return {
            docs
        }
    })

    // rota de POST de usuário
    app.post('/:id/registration', async (request, response)=>{
        const {id} = firebaseIdCollection.parse(request.params)
        const user = userSchema.parse(request.body)

        await registerUser(id, user)
        return response.status(201).send
    })
}