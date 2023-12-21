import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../index";
import {IPolitic} from "../../../@types/interfaces";


type TChangePolitic = Omit<IPolitic, "URLCadastro" | "qrCode_image" | "profile_image" | "id">
export async function changePoliticData(data: TChangePolitic, id : string){

    try{
        const docRef = doc(db, "politicos", id)
        await updateDoc(docRef, data)
        return true
    }catch (e: any){
        throw new Error(e.message)
    }
}
