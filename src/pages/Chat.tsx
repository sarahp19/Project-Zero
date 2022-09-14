import React from 'react';
import { auth } from '../components/app';
import ChatUsers from '../components/ChatUsers';
import Footer from '../components/Footer';
import Messages from '../components/Messages';
import NavBar from '../components/NavBar';
import SignIn from './SignIn';

function Chat() {
    console.log(auth.currentUser?.email);
    return auth ? (
        <div className="m-0 flex flex-col justify-center w-screen overflow-hidden bg-slate-600">
            <div className="ml-[10%]">
                <NavBar />
            </div>
            <>
            
            <div className="bg-slate-700 my-12 h-screen w-[70%] overflow-x-hidden border-2 ml-[15%] rounded-2xl flex">
                <ChatUsers name="zero" />
                <Messages />
            </div>
            </>
            <div className="overflow-hidden">
                <Footer />
            </div>
        </div>
    ) : (
        <SignIn />
    );
}

export default Chat;
