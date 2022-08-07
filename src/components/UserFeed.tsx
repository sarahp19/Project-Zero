import React from 'react';
import { auth } from './app';
import { onAuthStateChanged } from 'firebase/auth';

function UserFeed() {
    const user = auth.currentUser;

    return (
        <div>
            <h3>Welcome {user?.email}</h3>
        </div>
    );
}

export default UserFeed;
