import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [message, setMessage] = useState('Hello!');
    const [boxVisible, setBoxVisible] = useState(false);

    let user = {};

    const readValue = (property, value) => {
        user[property] = value;
    };

    const login = () => {
        fetch('http://localhost:8000/loginUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem(
                        'user_details',
                        JSON.stringify({
                            token: data.token,
                            user_id: data.user._id,
                            username: data.user.username,
                        }),
                    );

                    navigate('/videos');
                } else {
                    setMessage(data.massage);
                    setBoxVisible(true);
                    setTimeout(() => setBoxVisible(false), 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className="main">
            <div className="message-bg">
                {boxVisible === true ? (
                    <div className="message">{message}</div>
                ) : null}
            </div>

            <div className="login">
                <h1 style={{ marginBottom: '10px', fontWeight: '500' }}>
                    Log In
                </h1>
                <input
                    onChange={(e) => readValue('username', e.target.value)}
                    className="login-input"
                    type="text"
                    placeholder="Enter Username"
                    required
                />
                <input
                    onChange={(e) => readValue('password', e.target.value)}
                    className="login-input"
                    type="password"
                    placeholder="Enter Password"
                    required
                />
                <button
                    onClick={() => login()}
                    type="button"
                    className="btn login-btn"
                >
                    login
                </button>
                <h1>
                    <Link className="link" to="/register">
                        Dont have an account?
                    </Link>
                </h1>
            </div>
        </section>
    );
}

export default Login;
