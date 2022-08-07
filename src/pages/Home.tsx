import React from 'react';
import { auth } from '../components/app';
import SignOut from '../components/SignOut';
import NavBar from '../components/NavBar';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';
import '../css/Home.css';

function Home() {
    return (
        <div className="Home">
            <NavBar />
            <section className="Feed-Section">
                <UserFeed />
                <SideBar />
            </section>
        </div>
    );
}

export default Home;
