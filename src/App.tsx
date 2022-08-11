import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import './index.css';
import { auth } from './components/app';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App font-Poppins">
            <div>
                <div>{user ? <Home /> : <SignIn />}</div>
            </div>
        </div>
    );
}

export default App;
