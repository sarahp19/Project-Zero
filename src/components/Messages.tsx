import React, { useState } from 'react';
import ChatUsers from './ChatUsers';

export default function Messages() {
    const [ActiveTab, setActiveTab] = useState('');
    return (
        <div className="w-[100%] h-screen bg-slate-500">
            <div className="h-[10%] bg-slate-800 text-xl justify-start px-12 flex items-center">
                <div className="overflow-x-auto flex w-[70%]">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <button
                                onClick={() => setActiveTab('Anime')}
                                className="inline-block py-3 px-4 text-white bg-blue-600 rounded-lg active"
                                aria-current="page"
                            >
                                Anime
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => setActiveTab('Coding')}
                                className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                Coding
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => setActiveTab('Gaming')}
                                className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                Gaming
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => setActiveTab('VideoEditing')}
                                className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                Video Editing
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => setActiveTab('Sports')}
                                className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                Sports
                            </button>
                        </li>
                    </ul>
                </div>
                <img
                    src="https://www.trendytarzen.com/wp-content/uploads/2021/07/2-1.jpg"
                    className="h-12 m-4 rounded-full"
                />
                <h1 className="text-white">@Muneeb</h1>
            </div>
            <div className="bg-amber-100 h-[90%]">
                <ChatUsers active={ActiveTab} />
            </div>
        </div>
    );
}
