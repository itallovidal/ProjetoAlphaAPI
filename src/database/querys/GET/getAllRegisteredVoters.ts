import {db} from '../../index'
import {
    collection,
    getDocs, query, limit, startAt, orderBy
} from 'firebase/firestore'


export async function getAllRegisteredVoters(collection_id: string, page: number){

    console.log(page)
    const collectionRef = collection(db, `politicos/${collection_id}/cadastrados`)
    const q = query(collectionRef, orderBy('nome'), limit(5), startAt(page))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc)=>{
        return doc.data()
    })
}

