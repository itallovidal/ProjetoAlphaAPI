import {z} from "zod";

export const loginQuerySchema = z.object({
    email: z.string().email(),
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
        cep:   z.string().or(z.null()),
        bairro: z.string().or(z.null()),
        rua: z.string().or(z.null()),
        uf: z.string({
            required_error: 'Escreva o uf'
        }).min(2, {message: 'Mínimo de 2 caracteres.'})
            .max(2, {message: 'Máximo de 2 caracteres.'}),
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
    siteInstitucional: z.string().or(z.null()).default(null),
    facebook: z.string().or(z.null()).default(null),
    linkedin: z.string().or(z.null()).default(null),
    youtube: z.string().or(z.null()).default(null),
    instagram: z.string().or(z.null()).default(null),
})

export const searchPoliticSchema = z.object({
    id: z.string().uuid()
})