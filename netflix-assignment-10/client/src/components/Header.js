import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const username = useRef(
        JSON.parse(localStorage.getItem('user_details')).username,
    );

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    };

    return (
        <header className="header">
            <ul>
                <li>
                    <span style={{ color: 'lightgray' }}>Welcome, </span>
                    <span style={{ fontSize: '18px' }}>{username.current}</span>
                </li>
                <li className="logout-btn" onClick={() => logout()}>
                    Log Out
                </li>
            </ul>
        </header>
    );
}

export default Header;
