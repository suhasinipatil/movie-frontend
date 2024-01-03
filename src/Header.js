// Desc: Header component for the app
// This component contains the header for the app. It contains the title, search bar, and the login button.

import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import logo from "./images/logo.png";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
    }

    return (
        <header className={styles.headerDiv}>
            <h1 className={styles.title}>
                <a href="/" className={styles.titleRef}>
                    <img className={styles.logo} src={logo} alt="Movie App" />
                </a>
            </h1>
            <div className={styles.buttonContainer}>
                <button className={styles.write}>
                    Search
                </button>
                <button className={styles.about}>
                    <a href="/about" className={styles.writeRef}>About</a>
                </button>
                {isLoggedIn ? (
                    <>
                        <button className={styles.login} onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className={styles.login}>
                        <a href="/login" className={styles.writeRef} onClick={() => setIsLoggedIn(true)}>Login</a>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;