import {z} from "zod";
import {voterSchema} from "../routes/schemas";

interface IPartido{
    img_logo: string,
    img_qrCode: string,
    nome: string,
    sigla: string
}

export interface IPolitic{
    email: string,
    id: string,
    nome: string,
    partido: IPartido,
    senha: string,
    telefone: string
}

export interface IVoter extends z.infer<typeof voterSchema>{}
