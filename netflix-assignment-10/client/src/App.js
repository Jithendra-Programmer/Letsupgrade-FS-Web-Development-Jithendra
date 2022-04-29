import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Videos from './components/Videos';
import Videoplayer from './components/Videoplayer';

function App() {
    const RequireAuth = ({ children, redirectTo }) => {
        let isAuth = localStorage.getItem('user_details');

        if (isAuth != null) {
            return children;
        } else {
            return <Navigate to={redirectTo} />;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Videos />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/videos"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Videos />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/player/:videoid"
                    element={
                        <RequireAuth redirectTo="/login">
                            <Videoplayer />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
