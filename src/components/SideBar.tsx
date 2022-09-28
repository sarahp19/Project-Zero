import React, { Profiler, useEffect, useState } from 'react';
import usePromise from 'react-promise';
import { auth, db } from '../components/app';
import UserCard from './UserCard';
import { doc, collection, getDocs, where, setDoc } from 'firebase/firestore';
import { query } from '@firebase/firestore';

function SideBar() {
    const [Data, setData] = useState<object | undefined>({});
    const [FirstLoad, setFirstLoad] = useState(true);
    const user: string | undefined = auth.currentUser?.uid;
    console.log(user);
    const getData = async () => {
        if (user) {
            const q = query(
                collection(db, 'Users'),
                where('email', '==', auth.currentUser?.email)
            );

            const querySnapshot: any = await getDocs(q);
            querySnapshot.forEach((doc: any) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
                setData({
                    Profile: doc.data().profile,
                    // 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    FirstName: doc.data().name,
                    // UserName: querySnapshot[0].data().username
                    UserName: doc.id
                });
            });
            //         'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        }
    };

    useEffect(() => {
        if (FirstLoad) {
            getData();
        }

        return () => {
            setFirstLoad(false);
        };
    }, [FirstLoad]);

    return (
        <div className="hidden md:block">
            <div>
                <UserCard {...Data} />
            </div>
            <hr className="mt-8" />
        </div>
    );
}

export default SideBar;
