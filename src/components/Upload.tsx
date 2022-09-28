import { getDocs, where } from '@firebase/firestore';
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    Timestamp
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import urlExist from 'url-exist';
import { auth, db } from './app';
import NavBar from './NavBar';
import Post from './Posts';

function Upload() {
    // const [FirstCoat, setFirstCoat] = useState(false);
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

    getUserName();

    const [inputs, setInputs] = useState({ likedUsers: [''], Likes: 0 });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(inputs);

        const isValidURL = async (string: string) => {
            const res = await urlExist(string);
            return res !== null;
        };

        if (
            inputs?.title != '' &&
            (await isValidURL(inputs?.url)) &&
            inputs?.caption != ''
        ) {
            console.log('Posting it to the Firebase Cloud Rn');
            console.log(inputs);
            const docRef = await addDoc(collection(db, 'Posts'), {
                Likes: 0,
                UserID: `${Username}`,
                caption: `${inputs.caption}`,
                content: `${inputs.title}`,
                createdAt: serverTimestamp()
            });
            console.log(`${docRef.id} was created!`);
            // window.location.replace = '/';
            alert('Image has been uploaded');
        } else {
            alert('Wrong Details');
            window.location.reload();
        }
    };

    const [Data, setData] = useState({});
    const user = auth.currentUser?.uid;

    return (
        <div className="bg-slate-700 font-Poppins w-full h-screen flex flex-col mt-0 items-center">
            <NavBar highlight="Upload" />
            <h1 className="text-white text-center text-2xl mt-4">
                Welcome {Username}
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col self-center h-full justify-center"
            >
                <div className="mb-6">
                    <label className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-300">
                        Enter Image Url
                    </label>
                    <input
                        type="url"
                        name="title"
                        placeholder="Title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={inputs.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Enter Image Title
                    </label>
                    <input
                        type="text"
                        name="caption"
                        placeholder="Caption"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={inputs.caption || ''}
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I genuinely don't know why you exist
                    </label>
                    <input
                        type="url"
                        name="url"
                        placeholder="https://"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={inputs.url || ''}
                        onChange={handleChange}
                    />
                </div> */}
                <input
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                />
            </form>
        </div>
    );
}

async function handleUpload(user: string | undefined, data: any) {
    const q = query(
        collection(db, 'Users'),
        where('email', '==', auth.currentUser?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
    });

    await addDoc(collection(db, 'Posts'), {
        Likes: 0,
        UserID: querySnapshot[0].id,
        caption: data.caption,
        content: data.content,
        createdAt: serverTimestamp()
    });
}

export default Upload;
