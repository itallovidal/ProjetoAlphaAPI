import {addDoc, collection} from "firebase/firestore";
import {db} from "../../index";
import {IPolitic} from "../../../@types/interfaces";

export async function createPolitc(data: Omit<IPolitic, "id">){
    const usersCollection = collection(db, "politicos");
    const response = await addDoc(usersCollection, {
        id: crypto.randomUUID(),
        ...data
    })

    return response
}