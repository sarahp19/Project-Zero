import React from 'react';
import { auth } from '../components/app';
import NavBar from '../components/NavBar';
import UserFeed from '../components/UserFeed';
import SideBar from '../components/SideBar';

function Home() {
    return (
        <div className="Home bg-slate-400">
            <NavBar />
            <section className="Feed-Section grid grid-cols-6 h-screen gap-4 bg-slate-300">
                {/* <UserFeed /> */}
                <div className='bg-slate-200 col-start-2 col-span-3'>
                    <p className="Post"> Muneeb </p>
                </div>
                <SideBar />
            </section>
        </div>
    );
}

export default Home;
