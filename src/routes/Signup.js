import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleUsernameBlur = () => {
        setError("");
        if (username.trim() === '') {
            setUsernameError("Username cannot be empty");
            setUsername("");
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

    const handleConfirmPasswordBlur = () => {
        setError("");
        if (confirmPassword.trim() === '') {
            setConfirmPasswordError("Confirm Password cannot be empty");
            setConfirmPassword("");
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            setConfirmPassword("");
        } else {
            setConfirmPasswordError("");
        }
    }

    const handleSignup = () => {

        // Create an object with the user's signup data
        const userData = {
            username: username,
            password: password,
        };
        //console.log(JSON.stringify(userData));
        // Make the API request
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                //console.log(data);
                // Redirect to the home page
                navigate("/login");
            })
            .catch(error => {
                console.log(error);
                if (error instanceof SyntaxError && error.message.includes("Unexpected token")) {
                    setError("Username has already been taken");
                } else {
                    setError(error.message);
                }
            });
    };

    return (
        <div>
            <div className={styles.errorDiv}>
                {usernameError}<br />
                {passwordError}<br />
                {confirmPasswordError}
            </div>
            <div className={styles.form}>
                <table>
                    <tr>
                        <td>
                            <h4 className={styles.labelStyle}>Username</h4>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={usernameError ? styles.invalid : styles.inputStyle}
                                onBlur={handleUsernameBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 className={styles.labelStyle}>Password</h4>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={passwordError ? styles.invalid : styles.inputStyle}
                                onBlur={handlePasswordBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 className={styles.labelStyle}>Confirm Password</h4>
                            <input
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={confirmPasswordError ? styles.invalid : styles.inputStyle}
                                onBlur={handleConfirmPasswordBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                onClick={handleSignup}
                                disabled={usernameError || passwordError || confirmPasswordError}
                                className={styles.buttonStyle}
                            >Create Account</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <p className={styles.loginText}>
                                Already have an account?
                                <a href="/login" className={styles.loginUrl}>
                                    Login
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
                {error && (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
