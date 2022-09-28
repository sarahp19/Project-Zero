import React from 'react';

function UserCard(props: any) {
    return (
        <div className="flex items-center space-x-4 mt-10">
            <div className="flex-shrink-0">
                <img
                    className="w-10 h-10 rounded-full"
                    src={props.Profile}
                    alt="Neil image"
                />
            </div>
            <div className="flex-1 w-max">
                <p className="text-l font-medium text-gray-900 truncate dark:text-white">
                    @{props.UserName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {props.FirstName}
                </p>
            </div>
            {/* <div>
                <button className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div> */}
        </div>
    );
}

export default UserCard;
