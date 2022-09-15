import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './app';
import UserCard from './UserCard';

export default function ChatUsers(props: any) {
    const [UserSearch, setUserSearch] = useState('');
    const [SearchResults, setSearchResults] = useState({});
    const [FoundResult, setFoundResult] = useState(false);
    const handleChange = async () => {
        const q = query(
            collection(db, 'Users'),
            where('username', '==', UserSearch)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSearchResults((prev) => [doc.data()]);
            console.log(SearchResults);
            setFoundResult(true);
            console.log(doc.id, ' => ', doc.data());
        });
    };

    return (
        <div className="bg-slate-600 w-[35%]">
            <div className="flex bg-slate-400 p-4 h-[10%]">
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        @
                    </span>
                    <input
                        type="text"
                        onKeyDown={handleChange}
                        onChange={(e) => {
                            setUserSearch(e.target.value);
                            if (e.target.value == '') setFoundResult(false);
                        }}
                        id="website-admin"
                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                    />
                </div>
            </div>
            {!FoundResult ? (
                <ShowUsers />
            ) : (
                <ShowSearchResults search={SearchResults} />
            )}
        </div>
    );
}

function ShowUsers() {
    return (
        <div>
            <UserCard
                Profile="http://dummyimage.com/219x110.png/cc0000/ffffff"
                UserName="testing1"
                FirstName="Lmao"
            />
            <UserCard
                Profile="http://dummyimage.com/213x234.png/ff4444/ffffff"
                UserName="testing2"
                FirstName="Bruh"
            />
            <UserCard
                Profile="http://dummyimage.com/249x132.png/5fa2dd/fffffff"
                UserName="testing3"
                FirstName="Sheesh"
            />
        </div>
    );
}

function ShowSearchResults(props: any) {
    console.log(props.search);
    return (
        <div className='p-4 bg-slate-600' >
            {props.search ? (
                <UserCard
                    Profile={props.search[0].profile}
                    UserName={props.search[0].username}
                    FirstName={props.search[0].Name}
                />
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
}
