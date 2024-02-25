import { createContext, useState } from "react";
import { useCallback } from "react";    // Import the useCallback hook from React

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [favMovies, setFavmovies] = useState([]);

    const handleSetMovies = useCallback((movies) => {
        setFavmovies(movies);
    }, []);

    const handleUnsetMovies = () => {
        setFavmovies([]);
    }

    return (
        <MovieContext.Provider
            value={{
                favMovies,
                handleSetMovies,
                handleUnsetMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
