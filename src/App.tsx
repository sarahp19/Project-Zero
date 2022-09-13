import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import './index.css';
import { auth } from './components/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Upload from './components/Upload';
import Chat from './pages/Chat';

function App() {
    const [user] = useAuthState(auth);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <SignIn />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
