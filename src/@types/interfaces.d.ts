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
    siteInstitucional: string,
    facebook: string,
    linkedin: string,
}

export interface IVoter extends z.infer<typeof voterSchema>{}
