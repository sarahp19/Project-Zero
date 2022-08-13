import React, { useEffect, useState, useRef, useCallback } from 'react';
import {} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, app } from './app';
import usePromise from 'react-promise';
import Posts from './Posts';
import { doc, getDoc, orderBy, getDocs, collection, startAfter, query, QuerySnapshot, limit, where
} from 'firebase/firestore';
import getPosts from '../functions/getPosts';

function PostCard() {
	const referencePost = useRef()
    const [Temp, setTemp] = useState([]);
    const [LatestPost, setLatestPost] = useState(`sr7SBthujhjNyr4U6QMO`);

    useEffect(() => {
        // isMounted.current = true;

        const getPosts = async (user: any) => {

            let Posts: any = [];

            const postsRef = collection(db, 'Posts');

            const q = query(postsRef, where('UserID', '==', user), limit(1));
            const querySnapshot = await getDocs(q);

            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

            const next = query(
                postsRef,
                where('UserID', '==', user),
                startAfter(lastVisible),
                limit(1)
            );

            const LatestPosts = await getDocs(next);

            LatestPosts.forEach((doc) => {
                Posts.push([doc.id, doc.data()]);
                setLatestPost(doc.id);
            });

            console.log(Posts);
            setTemp(Posts);
        };

        getPosts('C.C');
    }, []);

    window.onscroll = (ev) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            getPosts('C.C');
        }
    };
    return (
        <div>
            {Temp.map((elem) => (
                <Posts post={elem[1]} key={elem[0]} />
            ))}
        </div>
    );
}

export default PostCard;
