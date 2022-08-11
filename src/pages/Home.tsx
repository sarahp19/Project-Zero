import React from 'react';
import { auth } from '../components/app';
import NavBar from '../components/NavBar';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="Home h-full bg-slate-700 w-full grid place-items-center">
            <NavBar />
            <br />
            <section className="Feed-Section flex">
                <div className="">
                    <UserFeed />
                </div>
                <div className="ml-8">
                    <SideBar />
                </div>
            </section>
            <br />
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
