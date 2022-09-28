import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../components/app';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Settings() {
    const [Name, setName] = useState('');
    const [Profile, setProfile] = useState('');
    const [Uname, setUname] = useState('');
    // const [FirstLoad, setFirstLoad] = useState(true);
    const [Changed, setChanged] = useState(false);

    const handleNameChange = (e: any) => {
        setChanged(false);
        setName(e.target.value);
    };
    const handleProfileChange = (e: any) => {
        setProfile(e.target.value);
        setChanged(false);
    };

    const getUserName = async () => {
        const email = auth.currentUser?.email;

        const q = query(collection(db, 'Users'), where('email', '==', email));

        const querySnapshot = await getDocs(q);
        // const uname = querySnapshot[0]?.id;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUname(doc.id);
            console.log(doc.id);
        });
    };

    getUserName();

    const handleChanges = async () => {
        const UserToUpdate = doc(db, 'Users', Uname);

        // Set the "capital" field of the city 'DC'
        if (Name == '' && Profile != '') {
            await updateDoc(UserToUpdate, {
                profile: Profile
            });
        } else if (Profile == '' && Name != '') {
            await updateDoc(UserToUpdate, {
                name: Name
            });
        } else if (Profile != '' && Name != '') {
            await updateDoc(UserToUpdate, {
                name: Name,
                profile: Profile
            });
        } else {
            alert('Enter data before Changing it!');
        }
        setChanged(true);
    };

    // const handleProfile = () =>

    return (
        <>
            <div className="bg-slate-700 m-0 h-screen">
                <div>.</div>
                <NavBar highlight="Settings" />
                <div className="h-[70%]">
                    <main>
                        <h1 className="text-white text-2xl mt-4 text-center">
                            Welcome to{' '}
                            <span className="text-blue-400">@{Uname}'s</span>{' '}
                            User Settings!
                        </h1>
                        <div className="flex flex-col w-[40%] ml-[30%] mt-8">
                            <p className="text-white text-center">
                                Enter new Name for{' '}
                                <span className="text-blue-400">
                                    @{Uname}
                                </span>
                            </p>
                            <input
                                onChange={handleNameChange}
                                placeholder="Insert the new name"
                                typeof="text"
                                className="m-4 p-2 rounded-lg"
                            />
                            <p className="text-white text-center">
                                Enter new Profile Url
                            </p>
                            <input
                                placeholder="Insert the Image Url"
                                typeof="url"
                                onChange={handleProfileChange}
                                className="m-4 p-2 rounded-lg"
                            />
                            <button
                                type="submit"
                                onClick={handleChanges}
                                className="bg-blue-500 mt-8 w-[40%] ml-[30%] hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            >
                                Submit the Changes
                            </button>
                        </div>
                    </main>
                    {Changed ? <h1>The Details were Updated!</h1> : <></>}
                </div>
                <Footer />
            </div>
        </>
    );
}
