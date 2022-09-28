import React from 'react';
import { auth } from './app';
import PostCard from './PostCard';
import usePromise from 'react-promise';

function UserFeed(props: any) {
    return (
        <div className="p-4">
            <PostCard username={props.User} />
            <br />
        </div>
    );
}

export default UserFeed;
