import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import {app} from "../components/app"

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
