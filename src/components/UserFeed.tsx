import React from 'react';
import { auth } from './app';
import PostCard from './PostCard';
import usePromise from "react-promise"

function UserFeed() {
    
    return (
        <div>
            <PostCard />
            <PostCard />
        </div>
    );
}

export default UserFeed;
