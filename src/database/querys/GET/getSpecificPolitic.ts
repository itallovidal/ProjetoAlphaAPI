import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../index";

export async function getSpecificPolitic(name: string, password: string){
    const colRef = collection(db, 'politicos')
    const q = query(colRef, where('nome','==', name), where('senha', '==', password))
    const snapshot = await getDocs(q)
    return {
        ...snapshot.docs[0].data(),
        collection_id: snapshot.docs[0].id
    }
}
