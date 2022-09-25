import React from 'react';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
// import {auth} from "../components/app"
// import { initializeApp } from 'firebase/app';
import { app } from '../components/app';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCg9BsOyh5FioJ1H1TAJA4cQ6MnmFhexcY',
//     authDomain: 'instagram-clone-1f015.firebaseapp.com',
//     projectId: 'instagram-clone-1f015',
//     storageBucket: 'instagram-clone-1f015.appspot.com',
//     messagingSenderId: '287394350570',
//     appId: '1:287394350570:web:bc7fc4f1367bf605dede93',
//     measurementId: 'G-B17LTD93YB'
// };

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(app), provider);
    };
    return (
        <div className="h-screen overflow-hidden bg-slate-600">
            <div className="top-0 w-[80%] ml-[10%]">
                <NavBar />
            </div>
            <div className="h-[56%] grid place-items-center">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="text-white text-2xl">
                        Welcome to{' '}
                        <span className="text-3xl text-slate-900">
                            PixShare
                        </span>
                        <br /> Please SignIn to continue
                    </h1>
                    <button
                        onClick={signInWithGoogle}
                        className="bg-blue-500 mt-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >
                        SignIn
                    </button>
                </div>
            </div>
            <div className="bottom-0 w-[80%] ml-[10%]">
                <Footer />
            </div>
        </div>
    );
}

export default SignIn;
