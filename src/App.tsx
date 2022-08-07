import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { auth } from './components/app';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <div>
                <div>{user ? <Home /> : <SignIn />}</div>
            </div>
        </div>
    );
}

export default App;
