import React from 'react';
import { auth } from '../components/app'
import SignOut from '../components/SignOut';
import NavBar from "../components/NavBar"
import UserFeed from "../components/UserFeed"
import SideBar from "../components/SideBar"

function Home() {
    return (
        <div>
            <NavBar />
            <UserFeed />
            <SideBar />
        </div>
    );
}

export default Home;
