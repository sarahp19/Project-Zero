import React, { useState } from 'react';
import ChatUsers from './ChatUsers';

export default function Messages() {
    const [ActiveTab, setActiveTab] = useState('');

    return (
        <div className="w-[100%] h-screen bg-slate-800">
            <div className="h-[10%] bg-slate-800 text-xl justify-start px-12 flex items-center">
                <div className="overflow-x-auto flex w-[70%]">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="Anime"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="Coding"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="Gaming"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="Video Editing"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="Sports"
                            />
                        </li>
                    </ul>
                </div>
                <img
                    src="https://www.trendytarzen.com/wp-content/uploads/2021/07/2-1.jpg"
                    className="h-12 m-4 rounded-full"
                />
                <h1 className="text-white">@Muneeb</h1>
            </div>
            <div className="bg-slate-400 h-[90%]">
                {ActiveTab == '' ? (
                    <h1>Select something</h1>
                ) : (
                    <ChatUsers active={ActiveTab} />
                )}
            </div>
        </div>
    );
}

function Button(props: any) {
    return props.IsActive == props.Name ? (
        <button
            onClick={() => props.setActiveTab(props.Name)}
            className="inline-block py-3 px-4 bg-blue-700 text-white rounded-lg active"
            aria-current="page"
        >
            {props.Name}
        </button>
    ) : (
        <button
            onClick={() => props.setActiveTab(props.Name)}
            className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
        >
            {props.Name}
        </button>
    );
}
