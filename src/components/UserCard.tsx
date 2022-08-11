import React from 'react';

function UserCard(props:any) {
    return (
        <div className=" h-20 w-auto p-sm text-gray-900">
            <div className="flex m-10">
                <img
                    className="h-20 w-20 mr-4 rounded-full"
                    src={props.Profile}
                />
                <div>
                    <h3 className="text-3xl text-gray-900">{props.UserName}</h3>

                    <p className="text-s text-gray-700">{props.FirstName}</p>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
