import React, { useState } from 'react';
import { auth } from './app';
import ChatUsers from './ChatUsers';

export default function Messages(props: any) {
    const [ActiveTab, setActiveTab] = useState('');
    // console.log(auth.currentUser);

    return (
        <div className="w-[100%] h-screen bg-slate-800">
            <div className="h-[10%] bg-slate-800 text-xl justify-start px-12 flex items-center">
                <div className="overflow-x-auto flex w-[70%]">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="AnimeChats"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="CodingChats"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="GamingChats"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="VideoEditingChats"
                            />
                        </li>
                        <li className="mr-2">
                            <Button
                                IsActive={ActiveTab}
                                setActiveTab={setActiveTab}
                                Name="SportsChats"
                            />
                        </li>
                    </ul>
                </div>
                <img src={props.profile} className="h-12 m-4 rounded-full" />
                <h1 className="text-white">@Muneeb</h1>
            </div>
            <div className="bg-slate-400 h-[90%]">
                {ActiveTab == '' ? (
                    <h1>Select something</h1>
                ) : (
                    <div className="bg-slate-400 h-full overflow-hidden">
                        {/* <h1>{ActiveTab}</h1> */}
                        <ChatUsers CurrentActive={ActiveTab} profile={props.profile} />
                    </div>
                )}
            </div>
        </div>
    );
}

function Button(props: any) {
    // props.setActiveTab;
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
            onClick={() => {
                console.log(props.Name);
                props.setActiveTab(props.Name);
            }}
            className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
        >
            {props.Name}
        </button>
    );
}
