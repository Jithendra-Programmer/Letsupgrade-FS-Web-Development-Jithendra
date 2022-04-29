import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [message, setMessage] = useState('Hello!');
    const [boxVisible, setBoxVisible] = useState(false);
    const navigate = useNavigate();

    let user = {};

    const readValue = (property, value) => {
        user[property] = value;
    };

    const regiser = () => {
        if (user.conform_password === user.password) {
            delete user.conform_password;

            fetch('http://localhost:8000/createuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        navigate('/login');
                    } else {
                        setMessage(data.massage);
                        setBoxVisible(true);
                        setTimeout(() => setBoxVisible(false), 3000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('Passwords doesnt match');
        }
    };

    return (
        <section className="main">
            <div className="message-bg">
                {boxVisible === true ? (
                    <div className="message">{message}</div>
                ) : null}
            </div>

            <div className="register">
                <h1 style={{ marginBottom: '10px', fontWeight: '500' }}>
                    Create an account
                </h1>

                <input
                    onChange={(e) => readValue('username', e.target.value)}
                    className="register-input"
                    text="text"
                    placeholder="Enter Username"
                    required
                />
                <input
                    onChange={(e) => readValue('mail', e.target.value)}
                    className="register-input"
                    text="text"
                    placeholder="Enter Mail"
                    required
                />
                <input
                    onChange={(e) => readValue('password', e.target.value)}
                    className="register-input"
                    text="password"
                    placeholder="Enter Password"
                    required
                />
                <input
                    onChange={(e) =>
                        readValue('conform_password', e.target.value)
                    }
                    className="register-input"
                    text="password"
                    placeholder="Confrom Password"
                    required
                />
                <button
                    onClick={() => regiser()}
                    type="button"
                    className="btn register-btn"
                >
                    Register
                </button>
                <h1>
                    <Link className="link" to="/login">
                        already have an account?
                    </Link>
                </h1>
            </div>
        </section>
    );
}

export default Register;
