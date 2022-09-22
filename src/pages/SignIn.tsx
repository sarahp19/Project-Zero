import React from 'react';
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
// import {auth} from "../components/app"
import { initializeApp } from 'firebase/app';
import { app } from '../components/app';

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
        <div>
            <button onClick={signInWithGoogle}>SignIn</button>
        </div>
    );
}

export default SignIn;
