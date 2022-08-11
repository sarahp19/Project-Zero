import React from 'react';
import { auth } from '../components/app';
import NavBar from '../components/NavBar';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="Home h-screen bg-slate-600">
            <NavBar />
            <section className="Feed-Section grid grid-cols-10 gap-4 bg-slate-700">
                <div className="bg-slate-700 col-start-3 col-span-4">
                    <UserFeed />
                </div>
                <div className='col-span-2 col-start-7'>
                    <SideBar />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home;
