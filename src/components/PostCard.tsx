import React from 'react';
import { doc, getDoc, collection, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, app } from './app';
import usePromise from 'react-promise';
import Posts from "./Posts"

function PostCard() {

    // const { value, loading } = usePromise(Promise.resolve(getData()));

    // if (loading) {
    //     return (
    //         <p>loading...</p>
    //     );
    // }
    return (
        <div>
            {/* <p>{value?.Bio}</p> */}
            <Posts />
        </div>
    );
}

// const getData = async () => {
//     const docRef = doc(db, 'Posts', 'zero');
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log('Document data:', docSnap.data()?.Bio);
//         return docSnap.data();
//     } else {
//         // doc.data() will be undefined in this case
//         console.log('No such document!');
//     }
// };

export default PostCard;
