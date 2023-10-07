import {collection, addDoc} from "firebase/firestore";
import {db} from "../../index";
import {IUser} from "../../../routes/politics";


export async function registerUser(collection_id: string, user: IUser){
    const colRef = collection(db, `politicos/${collection_id}/cadastrados`)
    await addDoc(colRef, user)
    return true
}