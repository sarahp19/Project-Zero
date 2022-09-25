import { collection, getDocs, where, query } from '@firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../components/app';
import ChatUsers from '../components/ChatUsers';
import Footer from '../components/Footer';
import Messages from '../components/Messages';
import NavBar from '../components/NavBar';
import SignIn from './SignIn';

function Chat() {
    const email = auth.currentUser?.email;
    const [ProfilePic, setProfilePic] = useState('');
    const getImage = async (email: string) => {
        const userRef = collection(db, 'Users');
        // const snapshot = await getDoc(userRef, where('email', '==', email));
        const q = query(userRef, where('email', '==', email));
        // const userData = await userRef.where('email', '==', email).get();
        // return snapshot;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data());
            setProfilePic(doc.data().profile);
        });
        // return querySnapshot[0].data();
    };

    // console.log(getImage("mohdmuneeb@gmail.com"));

    getImage(email);
    // console.log(auth.currentUser?.email);

    return auth ? (
        <div className="m-0 flex flex-col scrollbar justify-center overflow-y-hidden bg-slate-700">
            <div className="ml-[10%]">
                <NavBar highlight="Chat" />
            </div>
            <>
                <div className="bg-slate-700 my-12 w-[70%] overflow-x-hidden ml-[15%] rounded-2xl flex">
                    {/* <ChatUsers name="zero" /> */}
                    <Messages profile={ProfilePic} />
                </div>
            </>
            <div className="overflow-hidden w-[90%] rounded-t-xl ml-[5%]">
                <Footer />
            </div>
        </div>
    ) : (
        <SignIn />
    );
}

export default Chat;
