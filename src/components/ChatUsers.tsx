import React from 'react';

export default function ChatUsers(props: any) {
    return (
        <div className="bg-amber-500 w-[35%]">
            <div className="flex bg-slate-400 p-4 h-[10%]">
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        @
                    </span>
                    <input
                        type="text"
                        id="website-admin"
                        className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                    />
                </div>
            </div>
        </div>
    );
}
