import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCg9BsOyh5FioJ1H1TAJA4cQ6MnmFhexcY',
    authDomain: 'instagram-clone-1f015.firebaseapp.com',
    projectId: 'instagram-clone-1f015',
    storageBucket: 'instagram-clone-1f015.appspot.com',
    messagingSenderId: '287394350570',
    appId: '1:287394350570:web:bc7fc4f1367bf605dede93',
    measurementId: 'G-B17LTD93YB',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// export const database = getDatabase(app);
