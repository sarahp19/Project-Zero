import { query } from 'firebase/database';
import {
    addDoc,
    collection,
    doc,
    limit,
    orderBy,
    serverTimestamp,
    setDoc
} from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from './app';

export default function ChatUsers(props: any) {
    const [Active, setActive] = useState(props.active);

    useEffect(() => {
    
        setActive(props.CurrentActive)
    
      return () => {
        setActive('')
      }
    }, [props.CurrentActive])
    

    return (
        <div>
            {props.IsActive == '' ? (
                <h1>Choose something interesting</h1>
            ) : (
                <ChatRoom Active={props.active} Effect={Active} profile={props.profile} />
                // <h1>Testing {props.active}</h1>
            )}
        </div>
    );
}

function ChatRoom(props: any) {
    const dummy = useRef<null | HTMLDivElement>(null);
    const [formValue, setFormValue] = useState('');
    const messageRef = collection(db, 'Chats', `${props.Effect}`, 'messages');
    console.log(props.active)

    // console.log(messageRef);

    //DO TOUCH THIS, IDK HOW THIS WORKS BUT IT WORKS, DONT MESS WITH THIS FOR GOD'S SAKE

    const q = query(messageRef, orderBy('createdAt', 'desc'), limit(7));

    const [messages, loading, error] = useCollectionData(q, { idField: 'id' });

    //Have a field day from here

    const sendMessage = async (e: any) => {
        e.preventDefault();

        const uid = auth.currentUser?.uid;

        await addDoc(messageRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL: props.profile
        });

        setFormValue('');

        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    };

    console.log(dummy.current);

    return (
        <>
        {/* <h1>asd{props.CurrentActive} and {props.Effect}</h1> */}
            <main className="h-[80vh] scrollbar overflow-y-scroll flex flex-col-reverse w-full">
                {messages &&
                    messages.map((msg: any) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                <span ref={dummy}></span>
            </main>

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

function ChatMessage(props: any) {
    const { text, uid, photoURL, createdAt } = props.message;

    console.log(props.message);
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (
        <main className="flex ml-2 items-center">
            <div
                className={` m-2 flex item-center bg-slate-500 p-2 rounded-lg ${messageClass} w-[87%]`}
            >
                <img
                    className="w-8 h-8 m-2 rounded-full"
                    src={
                        photoURL ||
                        'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                    }
                />
                <p>{text}</p>
            </div>
            {/* <p className="mr-0 p-1 text-sm bg-slate-400">
                {
                    new Date(createdAt.seconds * 1000)
                        .toISOString()
                        .split('T')[1]
                        .split('.')[0]
                }
                <br />
                {new Date(createdAt.seconds * 1000).toISOString().split('T')[0]}
            </p> */}
            {/* <hr className='w-[70%] ml-[15%] border-black'/> */}
        </main>
    );
}
