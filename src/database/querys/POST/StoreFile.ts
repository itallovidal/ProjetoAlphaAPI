import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../index";

export async function storeFile(image: any, politic_id: string): Promise<string>{
    console.log(image)
    const fileType = image.mimetype.slice(6)
    const storageRef = ref(storage, `politicos/${politic_id}/${crypto.randomUUID()}.${fileType}`)

    // console.log('criou ref do armazenamento')

    const snapshot = await  uploadBytes(storageRef, image.buffer)
    return await getDownloadURL(snapshot.ref)
}