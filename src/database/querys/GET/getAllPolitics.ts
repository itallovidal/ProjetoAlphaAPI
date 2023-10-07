import {db} from '../../index'
import {
    collection,
    getDocs
} from 'firebase/firestore'


export async function getAllPolitics(){
    const colRef = collection(db, 'politicos')
    const snapshot = await getDocs(colRef)
    return snapshot.docs.map((doc)=>{
        return {
            data: doc.data(),
            collection_id: doc.id
        }
    })
}

