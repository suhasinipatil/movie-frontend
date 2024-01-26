// Desc: Login page

import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [usernameLoggedIn, setUsernameLoggedIn] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const clientId = "960166939820-jk4j2t4b8un08fqbmhvp05ctqebb8oeo.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/login";

    const { handleSetUser } = useContext(AuthContext);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleUsernameBlur = () => {
        setError("");
        if (usernameLoggedIn.trim() === '') {
            setUsernameError("Username cannot be empty");
            setUsernameLoggedIn("");
        } else {
            setUsernameError("");
        }
    };

    const handlePasswordBlur = () => {
        setError("");
        if (password.trim() === '') {
            setPasswordError("Password cannot be empty");
            setPassword("");
        } else {
            setPasswordError("");
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const loginData = {
                code: code,
            };
            fetch('http://localhost:8080/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loginData }),
            })
                .then(response => { response.text() })
                .then(data => {
                    // Handle the response from your server
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(usernameLoggedIn, password);

        const loginData = {
            username: usernameLoggedIn,
            password: password,
        };

        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Set the token in AuthContext
                const updatedUser = {
                    token: data.token,
                    loggedIn: true,
                    username: usernameLoggedIn,
                    id: data.id
                };
                handleSetUser(updatedUser);
                // Redirect to the home page
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                if (error instanceof SyntaxError && error.message.includes("Unexpected token")) {
                    setError("Username or password is incorrect");
                } else {
                    setError(error.message);
                }
                setUsernameLoggedIn("");
                setPassword("");
            });
    };

    return (
        <div>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`} className={styles.googlehref}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google logo" className={styles.googleImage} />
                        <span className={styles.googleText}>Sign in with Google</span>
                    </a>
                    <div className={styles.hrDiv}>
                        <hr className={styles.hr} /> <p className={styles.or}>OR</p> <hr className={styles.hr} />
                    </div>
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        className={usernameError ? styles.invalid : ''}
                        value={usernameLoggedIn}
                        onChange={(e) => setUsernameLoggedIn(e.target.value)}
                        onBlur={handleUsernameBlur}
                    />
                    <div
                        id="usernameError"
                        className={styles.errorMessage}
                    >
                        {usernameError}
                    </div>
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        className={passwordError ? styles.invalid : ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                    />
                    <div id="passwordError" className={styles.errorMessage}>{passwordError}</div>
                    <button
                        type="submit"
                        disabled={usernameError || passwordError}
                        className={usernameError || passwordError ? styles.buttonDisabled : styles.buttonEnabled}
                    >
                        Login
                    </button>
                    <p className={styles.signupText}>Don't have an account? <a href="/signup" className={styles.signUpUrl}>Sign up</a></p>
                    {error && (
                        <div className={styles.errorContainer}>
                            <p className={styles.errorMessage}>{error}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;