import {z} from "zod";

export const loginQuerySchema = z.object({
    name: z.string(),
    password: z.string()
})

export const firebaseIdCollection = z.object({
    collection_id: z.string().min(15)
})

export const getVotersSchema = z.object({
    collection_id: z.string().min(15),
    lastDoc: z.coerce.number().min(0)
})

export const voterSchema = z.object({
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


export const createPoliticSchema = z.object({
    email: z.string(),
    nome: z.string(),
    senha: z.string(),
    telefone: z.string(),
    partido_nome: z.string(),
    partido_sigla: z.string(),
    siteInstitucional: z.string(),
    facebook: z.string(),
    linkedin: z.string()
})

export const searchPoliticSchema = z.object({
    id: z.string().uuid()
})