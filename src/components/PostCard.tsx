import React, { useState, useEffect, useRef } from 'react';
import {
    collection,
    query,
    orderBy,
    startAfter,
    startAt,
    limit,
    getDocs
} from 'firebase/firestore';
import { db } from './app';
import Posts from './Posts';

export default function PostCard(props: any) {
    const [Post, setPost] = useState<any | string>([]);
    const [Loading, setLoading] = useState(false);
    const [LatestPost, setLatestPost] = useState<any | null>('');
    const [FirstCoat, setFirstCoat] = useState(true);
    // const [Temp, setTemp] = useState({});
    const [OffSet, setOffSet] = useState(0);
    const Temp = useRef(false);

    // Query the first page of docs

    useEffect(() => {
        if (FirstCoat) {
            const firstPosts = async () => {
                const first = query(
                    collection(db, 'Chats'),
                    orderBy('createdAt', 'desc'),
                    limit(10)
                );

                const documentSnapshots = await getDocs(first);
                documentSnapshots.docs.forEach((element) => {
                    setPost((prev: []) => [
                        ...prev,
                        JSON.stringify(element.data())
                    ]);
                });
                setLatestPost(documentSnapshots.docs[2]);
            };
            firstPosts();
        }
        return () => {
            setPost([]);
        };
    }, [FirstCoat]);

    // setFirstCoat(true);

    useEffect(() => {
        if (Temp.current) {
            // alert(LatestPost);
            console.log('New posts coming right up!');
            const fetchPosts = async () => {
                setLoading(true);
                const next = query(
                    collection(db, 'Posts'),
                    orderBy('createdAt', 'desc'),
                    startAfter(LatestPost),
                    limit(3)
                );
                const documentSnapshots = await getDocs(next);
                documentSnapshots.docs.forEach((element) => {
                    setPost((prev: []) => [
                        ...prev,
                        JSON.stringify(element.data())
                    ]);
                });
                console.log(LatestPost);
                setLatestPost(
                    documentSnapshots.docs[documentSnapshots.size - 1]
                );
            };

            fetchPosts();
        } else {
            Temp.current = true;
        }

        return () => {};
    }, [OffSet]);

    useEffect(() => {
        const handleScroll = (e: any) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight =
                e.target.documentElement.scrollTop + window.innerHeight;

            if (currentHeight + 1 >= scrollHeight) {
                setOffSet((prev) => prev + 5);
                console.log('Getting more data!');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {Post.map((elem: any) => (
                <Posts post={elem} />
            ))}
        </>
    );
}
