import React, { useState } from 'react';
import usePromise from 'react-promise';
import { auth, db } from '../components/app';
import UserCard from './UserCard';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';

const user = 'ASfEeK6s3UMfD4o0F9kHHyc8TS33';
console.log(auth);
const uid = auth.currentUser?.uid;
let docRef = doc(db, 'Users', user);
const docSnap = await getDoc(docRef);

function SideBar() {
    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }

    return (
        <div className="">
            <div>
                <UserCard
                    Profile={docSnap.data()?.profile}
                    FirstName={docSnap.data()?.name}
                    UserName={docSnap.data()?.username}
                />
            </div>
            <br />
            <div>
                <UserCard
                    Profile="https://exploringbits.com/wp-content/uploads/2021/11/anime-girl-pfp-2.jpg"
                    FirstName="lmao"
                    UserName="test"
                />
            </div>
        </div>
    );
}

export default SideBar;
