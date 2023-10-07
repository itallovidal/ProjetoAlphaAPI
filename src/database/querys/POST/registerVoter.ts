import {collection, addDoc} from "firebase/firestore";
import {db} from "../../index";
import {IVoter} from "../../../@types/interfaces";


export async function registerVoter(collection_id: string, user: IVoter){
    const colRef = collection(db, `politicos/${collection_id}/cadastrados`)
    await addDoc(colRef, user)
    return true
}