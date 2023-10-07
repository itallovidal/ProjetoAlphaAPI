import {addDoc, collection} from "firebase/firestore";
import {db} from "../../index";
import {IPolitic} from "../../../@types/interfaces";

export async function createPolitic(data: IPolitic){
    const usersCollection = collection(db, "politicos");
    const response = await addDoc(usersCollection, data)
    return response
}