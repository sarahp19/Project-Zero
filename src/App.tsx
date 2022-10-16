import { useAuthState } from 'react-firebase-hooks/auth';
import './index.css';
import { auth } from './components/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Upload from './components/Upload';
import Chat from './pages/Chat';
import Settings from './pages/Settings';

function App() {
    const [user] = useAuthState(auth);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <SignIn />} />
                <Route
                    path="/upload"
                    element={user ? <Upload /> : <SignIn />}
                />
                <Route path="/chat" element={user ? <Chat /> : <SignIn />} />
                <Route
                    path="/settings"
                    element={user ? <Settings /> : <SignIn />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
