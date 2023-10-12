import {db} from '../../index'
import {
    collection,
    getDocs, query, limit, startAfter, orderBy,
} from 'firebase/firestore'

import {Timestamp} from 'firebase/firestore'


export async function getAllRegisteredVoters(collection_id: string, lastDoc: number){
   const timestamp = Timestamp.fromMillis((lastDoc*1000));

    const collectionRef = collection(db, `politicos/${collection_id}/cadastrados`)
    const q = query(collectionRef,
        orderBy('created_at'),
        limit(5),
        startAfter(timestamp))

    const snapshot = await getDocs(q)

    const allDocs = snapshot.docs.map((doc)=>{
        return doc.data()
    })

    return allDocs.filter(data => data.created_at.seconds !== lastDoc)

}

