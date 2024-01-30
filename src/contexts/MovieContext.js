import { createContext, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [favMovies, setFavmovies] = useState([]);

    const handleSetMovies = (movies) => {
        setFavmovies(movies);
    }

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
