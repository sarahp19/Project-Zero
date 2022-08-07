import React from 'react';
import { auth } from '../components/app';
import SignOut from '../components/SignOut';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';
import '../css/Home.css';

function NavBar() {
    const user = auth.currentUser;

    return (
        <div>
            <p>PixShare</p>
            <h3>Welcome {user?.email}</h3>
        </div>
    );
}

export default NavBar;
