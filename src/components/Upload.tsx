import {
    addDoc,
    collection,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import React, { useState } from 'react';
import urlExist from 'url-exist';
import { auth, db } from './app';
import NavBar from './NavBar';
import Post from './Posts';

function temp() {
    const user = auth.currentUser?.uid;
    const data = {
        user: user,
        caption: 'cute anime girl',
        content: 'https://i.redd.it/at35w8r0w3o61.jpg'
    };
    handleUpload(user, data);
}

function Upload() {
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
                UserID: `${user}`,
                caption: `${inputs.caption}`,
                content: `${inputs.title}`,
                createdAt: serverTimestamp()
            });
            console.log(`${docRef.id} was created bruh`);
        } else {
            alert('Wrong Details');
            window.location.reload();
        }
    };

    const [Data, setData] = useState({});
    const user = auth.currentUser?.uid;

    return (
        <div className="bg-slate-700 font-Poppins w-full h-screen flex flex-col mt-0 items-center">
            <NavBar />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col self-center h-full justify-center"
            >
                <div className="mb-6">
                    <label className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={inputs.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Caption
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
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Enter the Image URL
                    </label>
                    <input
                        type="url"
                        name="url"
                        placeholder="https://"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={inputs.url || ''}
                        onChange={handleChange}
                    />
                </div>
                <input
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                />
            </form>
        </div>
    );
}

async function handleUpload(user: string | undefined, data: any) {
    await addDoc(collection(db, 'Posts'), {
        Likes: 0,
        UserID: data.user,
        caption: data.caption,
        content: data.content,
        createdAt: serverTimestamp()
    });
}

export default Upload;
