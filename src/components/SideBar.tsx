import { useEffect, useState } from 'react';
import { auth, db } from '../components/app';
import UserCard from './UserCard';
import { collection, getDocs, where } from 'firebase/firestore';
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
                    FirstName: doc.data().name,
                    UserName: doc.id
                });
            });
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
