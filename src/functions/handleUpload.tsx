import { serverTimestamp } from 'firebase/database';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../components/app';

async function handleUpload(user: string | undefined, data: any) {
    console.log(data.title, user);
    const docRef = await addDoc(collection(db, 'Posts'), {
        Likes: 0,
        UserID: `${user}`,
        caption: `${data.caption}`,
        content: `${data.content}`,
        createdAt: serverTimestamp()
    });

    console.log('Doc Created with docRef Id ', docRef);
}

export default handleUpload;
