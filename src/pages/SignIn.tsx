import React, { useState } from 'react';
import {
    EmailAuthCredential,
    EmailAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
// import {auth} from "../components/app"
// import { initializeApp } from 'firebase/app';
// const firebase = require('firebase');
import * as firebaseui from 'firebaseui';
import { app, auth, db } from '../components/app';
import { doc, setDoc } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { createUserWithEmailAndPassword } from '@firebase/auth';

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
    // firebaseui.start('#firebaseui-auth-container', {
    //     signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    //     // Other config options...
    // });
    // const PROVIDER_ID = new EmailAuthProvider();
    // var uiConfig = {
    //     signInSuccessUrl: '<url-to-redirect-to-on-success>',
    //     signInOptions: [
    //         // Leave the lines as is for the providers you want to offer your users.

    //     ],
    //     // tosUrl and privacyPolicyUrl accept either url string or a callback
    //     // function.
    //     // Terms of service url/callback.
    //     tosUrl: '<your-tos-url>',
    //     // Privacy policy url/callback.
    //     privacyPolicyUrl: function () {
    //         window.location.assign('<your-privacy-policy-url>');
    //     }
    // };
    // var ui = new firebaseui.auth.AuthUI(auth);
    // ui.start('#firebaseui-auth-container', uiConfig);

    const [Option, setOption] = useState('SignIn');
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Profile, setProfile] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [Username, setUsername] = useState('');

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(app), provider);
    };

    const signInWithEmail = () => {
        //     const Provider = new EmailAuthProvider();
        //     signInWithEmailAndPassword(auth, Email, Password);

        signInWithEmailAndPassword(getAuth(app), Email, Password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                alert(errorMessage);
            });
    };
    const createUser = () => {
        createUserWithEmailAndPassword(auth, Email, Password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                // Add a new document in collection "Users"
                await setDoc(doc(db, 'Users', Username), {
                    email: Email,
                    name: Name,
                    profile: Profile,
                    followers: [],
                    following: []
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // ..
            });
    };
    const handleEmail = (e: any) => setEmail(e.target.value);
    const handlePassword = (e: any) => setPassword(e.target.value);
    const handleName = (e: any) => setName(e.target.value);
    const handleProfile = (e: any) => setProfile(e.target.value);
    const handleUsername = (e: any) => setUsername(e.target.value);

    return (
        <div className="h-screen bg-slate-700">
            . <NavBar />
            <main className="my-8">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-2xl">
                        Welcome to{' '}
                        <span className="text-3xl text-slate-900">
                            PixShare
                        </span>
                        <br /> Please {Option} to continue
                    </h1>

                    {Option == 'SignIn' ? (
                        <div className="flex flex-col p-2 items-center justify-center m-8">
                            <input
                                inputMode="email"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Email"
                                onChange={handleEmail}
                            />
                            <input
                                type="password"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Password"
                                onChange={handlePassword}
                            />
                            <button
                                onClick={signInWithEmail}
                                className="bg-blue-500 mt-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            >
                                {Option}
                            </button>
                            {Error != '' ? (
                                <h1 className="text-white text-sm m-2">
                                    {Error}
                                </h1>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col p-2 items-center justify-center m-8">
                            <input
                                inputMode="text"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Full Name"
                                onChange={handleName}
                            />
                            <input
                                inputMode="text"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Username"
                                onChange={handleUsername}
                            />
                            <input
                                inputMode="text"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Profile Picture"
                                onChange={handleProfile}
                            />
                            <input
                                inputMode="email"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Email"
                                onChange={handleEmail}
                            />
                            <input
                                type="password"
                                className="m-4 p-2 w-[110%]"
                                placeholder="Password"
                                onChange={handlePassword}
                            />
                            <button
                                onClick={createUser}
                                className="bg-blue-500 mt-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            >
                                {Option}
                            </button>
                        </div>
                    )}
                    <div className="flex">
                        <button
                            onClick={() => setOption('SignUp')}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                            SignUp
                        </button>
                        <h1 className="px-8 text-3xl">|</h1>
                        <button
                            onClick={() => setOption('SignIn')}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                            SignIn
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
    // return (
    //     <div className="min:h-screen m-0 bg-slate-600">
    //         <div className="w-[80%] ml-[10%]">
    //             <NavBar />
    //         </div>
    //         <div className="min:h-[56%] h-full grid place-items-center">
    // <div className="flex flex-col justify-center items-center">
    //     <h1 className="text-white text-2xl">
    //         Welcome to{' '}
    //         <span className="text-3xl text-slate-900">
    //             PixShare
    //         </span>
    //         <br /> Please {Option} to continue
    //     </h1>

    //     {Option == 'SignIn' ? (
    //         <form className="flex flex-col p-2 items-center justify-center m-8">
    //             <input
    //                 inputMode="text"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Username"
    //             />
    //             <input
    //                 type="password"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Password"
    //             />
    //             <button
    //                 onClick={signInWithGoogle}
    //                 className="bg-blue-500 mt-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    //             >
    //                 SignIn
    //             </button>
    //         </form>
    //     ) : (
    //         <form className="flex flex-col p-2 items-center justify-center m-8">
    //             <input
    //                 inputMode="text"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Full Name"
    //             />
    //             <input
    //                 inputMode="text"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Profile Picture"
    //             />
    //             <input
    //                 inputMode="text"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Username"
    //             />
    //             <input
    //                 type="password"
    //                 className="m-4 p-2 w-[110%]"
    //                 placeholder="Password"
    //             />
    //             <button
    //                 onClick={signInWithGoogle}
    //                 className="bg-blue-500 mt-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    //             >
    //                 SignIn
    //             </button>
    //         </form>
    //     )}
    //     <div className="flex">
    //         <button
    //             onClick={() => setOption('SignUp')}
    //             className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    //         >
    //             SignUp
    //         </button>
    //         <h1 className="px-8 text-3xl">|</h1>
    //         <button
    //             onClick={() => setOption('SignIn')}
    //             className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    //         >
    //             SignIn
    //         </button>
    //     </div>
    // </div>
    //         </div>
    //         <div className="bottom-0 w-[80%] ml-[10%]">
    //             <Footer />
    //         </div>
    //     </div>
    // );
}

export default SignIn;
