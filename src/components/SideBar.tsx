import React from 'react';
import {auth} from '../components/app'

function SideBar() {
    const user = auth.currentUser;

    console.log(user)

    return (
        <div>
            <h4>{user?.displayName}</h4>
            <h4> SideBar</h4>
        </div>
    );
}

export default SideBar;
