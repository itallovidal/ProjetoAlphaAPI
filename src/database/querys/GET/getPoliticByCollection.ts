import {getDoc, doc} from "firebase/firestore";
import {db} from "../../index";

export async function getPoliticByCollection(id_collection: string){
    const docRef = doc(db, 'politicos', id_collection)
    const snapshot = await getDoc(docRef)

    if(snapshot.data()){
        return snapshot.data()
    }

    throw new Error("Político não encontrado.")
}