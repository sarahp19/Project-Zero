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
    // const [Active, setActive] = useState(props.active);
    return (
        <div>
            {props.IsActive == '' ? (
                <h1>Choose something interesting</h1>
            ) : (
                <ChatRoom Active={props.active} />
                // <h1>Testing {props.active}</h1>
            )}
        </div>
    );
}

function ChatRoom(props: any) {
    const dummy = useRef<null | HTMLDivElement>(null);
    const [formValue, setFormValue] = useState('');
    const messageRef = collection(db, 'Chats', 'AnimeChats', 'messages');

    // console.log(messageRef);
    const q = query(messageRef, orderBy('createdAt', 'desc'), limit(3));

    const [messages, loading, error] = useCollectionData(q, { idField: 'id' });

    const sendMessage = async (e: any) => {
        e.preventDefault();

        const uid = auth.currentUser?.uid;

        await addDoc(messageRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid
        });

        setFormValue('');

        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <main>
                {messages &&
                    messages.map((msg: any) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something nice"
                />

                <button type="submit" disabled={!formValue}>
                    Send
                </button>
            </form>
        </>
    );
}

function ChatMessage(props: any) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message flex ${messageClass}`}>
                <img
                    className="w-8 h-8 mr-4 rounded-full"
                    src={
                        photoURL ||
                        'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                    }
                />
                <p>{text}</p>
            </div>
        </>
    );
}
