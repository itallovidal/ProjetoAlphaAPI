import {collection, getCountFromServer} from "firebase/firestore";
import {db} from "../../index";

export async function getCountRegisteredVoters(collection_id: string){
    const colRef = collection(db, `politicos/${collection_id}/cadastrados`)
    const snapshot = await getCountFromServer(colRef)
    return snapshot.data().count
}
