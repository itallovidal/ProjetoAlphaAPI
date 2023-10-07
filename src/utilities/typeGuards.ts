import {IPolitic} from "../@types/interfaces";

export function isPolitic(obj: any) : obj is IPolitic {
    if(typeof obj !== 'object')
        return false

    if(!("email" in obj) && !("id" in obj) && !("telefone" in obj))
        return false

    if(!("nome" in obj) && !("senha" in obj))
        return false

    return true
}