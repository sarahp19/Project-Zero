import React, { useEffect } from 'react';
import changeLikes from '../functions/changeLikes';
import getPosts from '../functions/getPosts';
import { auth } from './app';

function Posts(props: any) {
    const user = auth.currentUser?.uid;

    const  Data = JSON.parse(props.post);
    // console.log(props.post)
    // console.log(Data)

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
            <div className="pr-8 pl-8 pt-4">
                <div className="flex self-center justify-right items-center mb-2 bg-gray-900 rounded-xl pr-4 ">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="w-12 h-12 rounded-full"
                            src="https://www.trendytarzen.com/wp-content/uploads/2021/07/2-1.jpg"
                            alt="Neil image"
                        />
                        <h3 className="font-bold tracking-tight text-gray-800 dark:text-white text-xl m-4">
                            {Data.UserID}
                        </h3>
                    </div>
                    <button className="inline-flex items-center m-4 justify-center w-10 h-10 float-right ml-auto mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {Data.caption}
                    </h5>
                </a>

                {(Data.description == '') ||
                (Data.description == undefined) ? (
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {' '}
                        No description found
                    </p>
                ) : (
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {Data}
                    </p>
                )}
                <div className="grid grid-cols-5 p-2">
                    <img
                        className="rounded w-80 col-span-3 col-start-2 shadow-xl mb-3"
                        src={Data.content}
                        alt=""
                    />
                </div>
                {/* <button
                    onClick={(e) => {
                        return changeLikes(Data, props.PostID, e);
                    }}
                    className="inline-flex mb-4 items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                >
                    <svg
                        className="w-4 h-4 mr-3 fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                </button> */}
            </div>
        </div>
    );
    // return <h1>Hello?</h1>
}

export default Posts;
