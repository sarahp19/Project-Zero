import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { auth } from './components/app';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
    const [count, setCount] = useState(0);
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
				<h2>PixShare</h2>
                <div>{user ? <Home /> : <SignIn />}</div>
            </div>
        </div>
    );
}

export default App;
