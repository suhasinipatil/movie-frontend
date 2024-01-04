// Desc: MovieApp component for the Movie App project. 
// This component is the parent component for the entire app. 
// It contains the header, footer, and the main content of the app. It also contains the routes for the app.

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutMe from './AboutMe';
import Header from './Header';
import Home from './Home';

const MovieApp = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (input) => {
        console.log(input);
        setSearchInput(input);
        // handleSearchInput(input);
    }

    return (
        <>
            <Header handleSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Home searchInput={searchInput} />} />
                <Route path="/about" element={<AboutMe />} />
            </Routes>
        </>
    );
};

export default MovieApp;