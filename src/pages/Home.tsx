import React, { useEffect, useState } from 'react';
import { auth, db } from '../components/app';
import NavBar from '../components/NavBar';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
// import { getDocs } from 'firebase/firestore';

import { collection, query, where, getDocs } from 'firebase/firestore';

function Home() {
    const [FirstCoat, setFirstCoat] = useState(false);
    const [Username, setUsername] = useState<string | null>('');
    const getUserName = async () => {
        const email = auth.currentUser?.email;

        const q = query(collection(db, 'Users'), where('email', '==', email));

        const querySnapshot = await getDocs(q);
        // const uname = querySnapshot[0]?.id;
        querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
            setUsername(doc.id);
            // console.log(doc.id);
        });
    };

    useEffect(() => {
        getUserName();

        return () => {
            setFirstCoat(false);
        };
    }, [FirstCoat]);

    return (
        <div className="Home h-full bg-slate-700 w-full grid place-items-center">
            <NavBar highlight="Home" />
            <br />
            <section className="Feed-Section self-center justify-center flex w-full">
                <div className="ml-1/4 w-8/10">
                    <UserFeed User={Username} />
                </div>
                <div className="ml-12">
                    <SideBar />
                </div>
            </section>
            <br />
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
