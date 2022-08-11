import React from 'react';
import { auth } from '../components/app';
import SignOut from '../components/SignOut';
import UserFeed from '../components/UserFeed';
import { AiOutlineLogout} from 'react-icons/ai'
import SideBar from '../components/SideBar';

function NavBar() {

    return (
        <div>
            <p>PixShare</p>
            <AiOutlineLogout />
            
        </div>
    );
}

export default NavBar;
