import React from 'react';
import usePromise from 'react-promise';
import { auth, db } from '../components/app';
import UserCard from './UserCard';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';

const user = auth.currentUser;
const uid = user.uid
// const user = 'ASfEeK6s3UMfD4o0F9kHHyc8TS33';
console.log(auth);
const docRef = doc(db, 'Users', uid);
const docSnap = await getDoc(docRef);
console.log(user);

function SideBar() {
    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }

    return (
        <div>
            <UserCard
                Profile={docSnap.data()?.profile}
                FirstName={docSnap.data()?.name.split(' ')[0]}
                UserName={docSnap.data()?.username}
            />
        </div>
    );
}

export default SideBar;
