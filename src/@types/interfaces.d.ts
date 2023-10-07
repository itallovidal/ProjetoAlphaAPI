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