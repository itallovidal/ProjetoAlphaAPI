import {z} from "zod";
import {voterSchema} from "../routes/schemas";

interface IPartido{
    nome: string,
    sigla: string
}

export interface IPolitic{
    email: string,
    id: string,
    nome: string,
    partido: IPartido,
    senha: string,
    telefone: string,
    profile_image: string,
    qrCode_image: string,
}

export interface IVoter extends z.infer<typeof voterSchema>{}
