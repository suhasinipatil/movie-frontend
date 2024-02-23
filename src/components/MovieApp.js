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
import MovieDetails from '../routes/MovieDetails';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';

const MovieApp = () => {
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    //const moviesState = useSelector((state) => state.movies);

    const handleSearch = (input) => {
        //console.log(input);
        setSearchInput(input);
    }

    // Fetch all movies when user is not logged in
    useEffect(() => {
        fetch(`http://localhost:8080/movies/year`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.message && json.message.includes("not found")) {
                    console.log(`No movies found.`);
                } else {
                    dispatch({ type: 'SET_MOVIES', payload: json });
                }
            });
    }, [dispatch]);

    return (
        <>
            <Header handleSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Home searchInput={searchInput} />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:movieId" element={<MovieDetails />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
};

export default MovieApp;