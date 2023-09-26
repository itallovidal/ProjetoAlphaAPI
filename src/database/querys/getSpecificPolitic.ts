import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../index";

export async function getSpecificPolitic(id: string){
    const colRef = collection(db, 'politicos')
    const q = query(colRef, where('id','==', id))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc)=>{
        return {
            data: doc.data(),
            collection_id: doc.id
        }
    })
}
