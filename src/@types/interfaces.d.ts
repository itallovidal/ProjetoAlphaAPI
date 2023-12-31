import {z} from "zod";
import {voterSchema} from "./schemas";

interface IPartido{
    nome: string,
    sigla: string,
}

export interface IPolitic{
    partido: IPartido,
    email: string,
    id: string,
    nome: string,
    senha: string,
    telefone: string,
    profile_image: string,
    qrCode_image: string,
    siteInstitucional: string |  null,
    instagram: string |  null
    facebook: string |  null,
    linkedin: string |  null,
    URLCadastro: string
}

export interface IVoter extends z.infer<typeof voterSchema>{}
