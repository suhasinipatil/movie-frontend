// Desc: Header component for the app
// This component contains the header for the app. It contains the title, search bar, and the login button.

import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Header.module.css";
import logo from "../images/croppedlogo.png";
import { AuthContext } from "../contexts/AuthContext";

const Header = ({ handleSearch }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const { user, handleUnsetUser } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(user ? user.loggedIn : false);

    useEffect(() => {
        setIsLoggedIn(user ? user.loggedIn : false);
    }, [user]);

    const logout = () => {
        setIsLoggedIn(false);
    }

    const login = () => {
        setIsLoggedIn(true);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //console.log(searchInput);
            handleSearch(event.target.value); // Pass the search input to the parent component
            setSearchInput(''); // Clear the input field
            setShowSearchBar(false); // Hide the search bar
        }
    }

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <header className={styles.headerDiv}>
            <h1 className={styles.title}>
                <a href="/" className={styles.titleRef}>
                    <img className={styles.logo} src={logo} alt="Movie App" />
                </a>
            </h1>
            <div className={styles.buttonContainer}>
                {showSearchBar && (
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Keyword / Title"
                        value={searchInput}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                )}
                <button className={styles.search} onClick={() => setShowSearchBar(true)}>
                    Search
                </button>
                <button className={styles.about}>
                    <a href="/about" className={styles.Ref}>About</a>
                </button>
                {isLoggedIn ? (
                    <>
                        <button className={styles.login} onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className={styles.login}>
                        <a href="/login" className={styles.Ref} onClick={login}>Login</a>
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;