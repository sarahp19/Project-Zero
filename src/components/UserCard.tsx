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
        </div>
    );
}

export default UserCard;
