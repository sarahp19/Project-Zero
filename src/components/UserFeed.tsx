import React from 'react';
import { auth } from './app';
import PostCard from './PostCard';
import usePromise from "react-promise"

function UserFeed() {
    
    return (
        <div className='p-4'>
            <PostCard />
            <br />
        </div>
    );
}

export default UserFeed;
