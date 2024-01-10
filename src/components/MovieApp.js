// Desc: MovieApp component for the Movie App project. 
// This component is the parent component for the entire app. 
// It contains the header, footer, and the main content of the app. It also contains the routes for the app.

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutMe from '../routes/AboutMe';
import Header from '../components/Header';
import Login from '../routes/Login';
import Home from '../routes/Home';
import Signup from '../routes/Signup';

const MovieApp = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (input) => {
        //console.log(input);
        setSearchInput(input);
    }

    return (
        <>
            <Header handleSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Home searchInput={searchInput} />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
};

export default MovieApp;