// Desc: MovieApp component for the Movie App project. 
// This component is the parent component for the entire app. 
// It contains the header, footer, and the main content of the app. It also contains the routes for the app.

import { Routes, Route } from 'react-router-dom';
import AboutMe from './AboutMe';
import Home from './Home';

const MovieApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
        </Routes>
    );
}

export default MovieApp;