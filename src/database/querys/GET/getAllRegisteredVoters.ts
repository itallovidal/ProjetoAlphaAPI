import {db} from '../../index'
import {
    collection,
    getDocs
} from 'firebase/firestore'


export async function getAllRegisteredVoters(collection_id: string){
    const colRef = collection(db, `politicos/${collection_id}/cadastrados`)
    const snapshot = await getDocs(colRef)
    return snapshot.docs.map((doc)=>{
        return doc.data()
    })
}

