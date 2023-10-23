import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../index";

export async function loginPolitic(email: string, password: string){
    const colRef = collection(db, 'politicos')
    const q = query(
        colRef,
        where('nome','==', email),
        where('senha', '==', password)
    )

    try{
        const snapshot = await getDocs(q)
        return {
            ...snapshot.docs[0].data(),
            collection_id: snapshot.docs[0].id
        }

    } catch (e){
        throw new Error('Usuário não encontrado', {
            cause: {userNotFound: true}
        })
    }

}