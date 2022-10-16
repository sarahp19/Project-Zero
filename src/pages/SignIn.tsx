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
// import * as firebaseui from 'firebaseui';
import { app, auth, db } from '../components/app';
import { doc, setDoc } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { createUserWithEmailAndPassword } from '@firebase/auth';

function SignIn() {
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
                            <div className="flex">
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
                            </div>
                            <div className="flex">
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
                            </div>
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
}

export default SignIn;
