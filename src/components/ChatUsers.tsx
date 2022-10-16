// import { query } from 'firebase/database';
// import {
//     addDoc,
//     collection,
//     doc,
//     limit,
//     orderBy,
//     serverTimestamp,
//     setDoc
// } from 'firebase/firestore';
// import React, { useState, useEffect, useRef } from 'react';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { auth, db } from './app';

// export default function ChatUsers(props: any) {
//     const [Active, setActive] = useState(props.active);

//     useEffect(() => {
//         setActive(props.CurrentActive);

//         return () => {
//             setActive('');
//         };
//     }, [props.CurrentActive]);

//     return (
//         <div>
//             {props.IsActive == '' ? (
//                 <h1>Choose something interesting</h1>
//             ) : (
//                 <ChatRoom
//                     Active={props.active}
//                     Effect={Active}
//                     profile={props.profile}
//                 />
//             )}
//         </div>
//     );
// }

// function ChatRoom(props: any) {
//     const dummy = useRef<null | HTMLDivElement>(null);
//     const [formValue, setFormValue] = useState('');
//     const messageRef = collection(db, 'Chats', `${props.Effect}`, 'messages');
//     // console.log(props.active);

//     //DO TOUCH THIS, IDK HOW THIS WORKS BUT IT WORKS, DONT MESS WITH THIS FOR GOD'S SAKE

//     const [Post, setPost] = useState<any | string>([]);
//     const [Loading, setLoading] = useState(false);
//     const [LatestPost, setLatestPost] = useState<any | null>('');
//     const [FirstCoat, setFirstCoat] = useState(true);
//     // const [Temp, setTemp] = useState({});
//     const [OffSet, setOffSet] = useState(0);
//     const Temp = useRef(false);

//     // Query the first page of docs

//     useEffect(() => {
//         if (FirstCoat) {
//             const firstPosts = async () => {
//                 const first = query(
//                     collection(db, 'Posts'),
//                     orderBy('createdAt', 'desc'),
//                     limit(3)
//                 );

//                 const documentSnapshots = await getDocs(first);
//                 documentSnapshots.docs.forEach((element) => {
//                     setPost((prev: []) => [
//                         ...prev,
//                         JSON.stringify(element.data())
//                     ]);
//                 });
//                 setLatestPost(documentSnapshots.docs[2]);
//             };
//             firstPosts();
//         }
//         return () => {
//             setPost([]);
//         };
//     }, [FirstCoat]);

//     // setFirstCoat(true);

//     useEffect(() => {
//         if (Temp.current) {
//             // alert(LatestPost);
//             console.log('New posts coming right up!');
//             const fetchPosts = async () => {
//                 setLoading(true);
//                 const next = query(
//                     collection(db, ''),
//                     orderBy('createdAt', 'desc'),
//                     startAfter(LatestPost),
//                     limit(3)
//                 );
//                 const documentSnapshots = await getDocs(next);
//                 documentSnapshots.docs.forEach((element) => {
//                     setPost((prev: []) => [
//                         ...prev,
//                         JSON.stringify(element.data())
//                     ]);
//                 });
//                 console.log(LatestPost);
//                 setLatestPost(
//                     documentSnapshots.docs[documentSnapshots.size - 1]
//                 );
//             };

//             fetchPosts();
//         } else {
//             Temp.current = true;
//         }

//         return () => {};
//     }, [OffSet]);

//     useEffect(() => {
//         const handleScroll = (e: any) => {
//             const scrollHeight = e.target.documentElement.scrollHeight;
//             const currentHeight =
//                 e.target.documentElement.scrollTop + window.innerHeight;

//             if (currentHeight + 1 >= scrollHeight) {
//                 setOffSet((prev) => prev + 5);
//                 console.log('Getting more data!');
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     //Have a field day from here

//     const sendMessage = async (e: any) => {
//         e.preventDefault();

//         const uid = auth.currentUser?.uid;

//         await addDoc(messageRef, {
//             text: formValue,
//             createdAt: serverTimestamp(),
//             uid,
//             photoURL: props.profile
//         });

//         setFormValue('');

//         dummy.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     console.log(dummy.current);

//     return (
//         <>
//             {/* <h1>asd{props.CurrentActive} and {props.Effect}</h1> */}
//             <main className="h-[80vh] scrollbar overflow-y-scroll flex flex-col-reverse w-full">
//                 {messages &&
//                     messages.map((msg: any) => (
//                         <ChatMessage key={msg.id} message={msg} />
//                     ))}

//                 <span ref={dummy}></span>
//             </main>

//             <form
//                 onSubmit={sendMessage}
//                 className="ml-[15%] mt-4 flex items-center w-[70%] "
//             >
//                 <input
//                     value={formValue}
//                     onChange={(e) => setFormValue(e.target.value)}
//                     placeholder="Enter the message!"
//                     className="p-1 rounded-xl w-[90%] ml-4 appearance-none border-none focus:ring-0"
//                 />

//                 <button
//                     type="submit"
//                     className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ml-2"
//                     disabled={!formValue}
//                 >
//                     Send
//                 </button>
//             </form>
//         </>
//     );
// }

function ChatMessage(props: any) {
    // const { text, uid, photoURL, createdAt } = props.message;

    console.log(props.message);
    const messageClass =
        props.message.uid === auth.currentUser?.uid ? 'sent' : 'received';
    const FinalRenderedMessage = JSON.parse(props.message);

    return (
        <main className="flex ml-2 items-center">
            <div
                className={` m-2 flex item-center bg-slate-500 p-2 rounded-lg ${messageClass} w-[87%]`}
            >
                <img
                    className="w-8 h-8 m-2 rounded-full"
                    src={
                        FinalRenderedMessage.photoURL ||
                        'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                    }
                />
                <p>{FinalRenderedMessage.text}</p>
            </div>
        </main>
    );
}

import { addDoc, serverTimestamp } from '@firebase/firestore';
import {
    collection,
    query,
    orderBy,
    startAfter,
    limit,
    getDocs
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from './app';

export default function ChatUsers(props: any) {
    const [Category, setCategory] = useState('AnimeChats');
    const [FirstCoat, setFirstCoat] = useState(true);
    const [formValue, setFormValue] = useState('');
    const [Message, setMessage] = useState<any | string[]>([]);
    const [OffSet, setOffSet] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [LatestMessage, setLatestMessage] = useState<any | null>('');
    const dummy = useRef<null | HTMLDivElement>(null);
    const Temp = useRef(false);

    const sendMessage = async (e: any) => {
        e.preventDefault();

        const uid = auth.currentUser?.uid;

        const messageRef = collection(
            db,
            'Chats',
            `${props.Effect}`,
            'messages'
        );
        await addDoc(messageRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL: props.profile
        });

        setFormValue('');

        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (FirstCoat) {
            const firstMessages = async () => {
                const first = query(
                    collection(db, 'Chats', Category, 'messages'),
                    orderBy('createdAt', 'desc'),
                    limit(10)
                );

                const documentSnapshots = await getDocs(first);
                documentSnapshots.docs.forEach((element) => {
                    setMessage((prev: []) => [
                        ...prev,
                        JSON.stringify(element.data())
                    ]);
                });
                setLatestMessage(documentSnapshots.docs[4]);
            };
            firstMessages();
        }
        return () => {
            setMessage([]);
        };
    }, [FirstCoat]);

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

    useEffect(() => {
        if (Temp.current) {
            // alert(LatestPost);
            console.log('New messages coming right up!');
            const fetchPosts = async () => {
                setLoading(true);
                const next = query(
                    collection(db, 'Chats', Category, 'messages'),
                    orderBy('createdAt', 'desc'),
                    startAfter(LatestMessage),
                    limit(10)
                );
                const documentSnapshots = await getDocs(next);
                documentSnapshots.docs.forEach((element) => {
                    setMessage((prev: []) => [
                        ...prev,
                        JSON.stringify(element.data())
                    ]);
                });
                console.log(LatestMessage);
                setLatestMessage(
                    documentSnapshots.docs[documentSnapshots.size - 1]
                );
            };

            fetchPosts();
        } else {
            Temp.current = true;
        }

        return () => {};
    }, [OffSet]);

    return (
        <>
            <main className="h-[80vh] scrollbar overflow-y-scroll flex flex-col-reverse w-full">
                {Message &&
                    Message.map((msg: any) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                <span ref={dummy}></span>
            </main>{' '}
            <form
                onSubmit={sendMessage}
                className="ml-[15%] mt-4 flex items-center w-[70%] "
            >
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Enter the message!"
                    className="p-1 rounded-xl w-[90%] ml-4 appearance-none border-none focus:ring-0"
                />

                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ml-2"
                    disabled={!formValue}
                >
                    Send
                </button>
            </form>
        </>
    );
}
