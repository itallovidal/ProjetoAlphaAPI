import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../index";
import {IPolitic} from "../../../@types/interfaces";

export async function createPolitic(data: IPolitic){
    const usersCollection = collection(db, "politicos");
    const response = await addDoc(usersCollection, {
        ...data,
        created_at: serverTimestamp()
    })
    return response
}