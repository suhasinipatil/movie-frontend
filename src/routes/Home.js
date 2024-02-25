// Desc: Home page

import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import MovieItem from "../components/MovieItem";
import { AuthContext } from '../contexts/AuthContext';
import { MovieContext } from '../contexts/MovieContext';
import { useSelector } from "react-redux";
import MovieListWithPagination from "../components/MovieListWithPagination";

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { handleSetMovies } = useContext(MovieContext);

    const [genreFilter, setGenreFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');

    const moviesState = useSelector((state) => state.movies);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page

    const totalPages = useMemo(() => Math.ceil(movies.length / itemsPerPage), [movies, itemsPerPage]);
    const indexOfLastItem = useMemo(() => currentPage * itemsPerPage, [currentPage, itemsPerPage]);
    const indexOfFirstItem = useMemo(() => indexOfLastItem - itemsPerPage, [indexOfLastItem, itemsPerPage]);
    const currentItems = useMemo(() => movies.slice(indexOfFirstItem, indexOfLastItem), [movies, indexOfFirstItem, indexOfLastItem]);

    const updatePage = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    const handleGenreChange = useCallback((e) => {
        setGenreFilter(e.target.value);
    }, []);

    const handleLanguageChange = useCallback((e) => {
        setLanguageFilter(e.target.value);
    }, []);

    const handleCountryChange = useCallback((e) => {
        setCountryFilter(e.target.value);
    }, []);

    const filteredItems = useMemo(() => {
        return currentItems.filter((movie) =>
            movie.Genre.toLowerCase().includes(genreFilter.toLowerCase()) &&
            movie.Language.toLowerCase().includes(languageFilter.toLowerCase()) &&
            movie.Country.toLowerCase().includes(countryFilter.toLowerCase())
        );
    }, [currentItems, genreFilter, languageFilter, countryFilter]);

    const movieItems = useMemo(() => {
        return filteredItems.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} IsFav={false} />
        ));
    }, [filteredItems]);

    // Fetch favourite movies when user is logged in and all movies when user is not logged in
    useEffect(() => {
        if (user.loggedIn) {
            fetch(`http://localhost:8080/movies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message && json.message.includes("not found")) {
                        //setFavouriteMovies([]);
                        setMovies([]);
                    } else {
                        //setFavouriteMovies(json);
                        setMovies(json);
                        handleSetMovies(json);
                    }
                });
        } else {
            setMovies(moviesState);
        }

        if (searchInput !== "") {
            fetch(`http://localhost:8080/movies/?title=` + searchInput,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message && json.message.includes("not found")) {
                        setError(`No results for "${searchInput}". Please try another title.`);
                        setMovies([]);
                    } else {
                        setError(null);
                        setMovies(json);
                    }
                });
        }
    }, [user.loggedIn, user.token, handleSetMovies, moviesState, searchInput]);

    return (
        <div className="Home">
            {error ? (
                <p className="errorMessage">{error}</p>
            ) : searchInput !== "" ? (
                <>
                    <div className="filter-container">
                        <select value={genreFilter} onChange={handleGenreChange} className="filterButton">
                            <option value="">Genres</option>
                            <option value="action">Action</option>
                            <option value="comedy">Comedy</option>
                            <option value="drama">Drama</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="thriller">Thriller</option>
                            <option value="documentary">Documentary</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="adventure">Adventure</option>
                            <option value="animation">Animation</option>
                            <option value="crime">Crime</option>
                        </select>

                        <select value={languageFilter} onChange={handleLanguageChange} className="filterButton">
                            <option value="">Languages</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="hindi">Hindi</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Punjabi">Punjabi</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Dutch">Dutch</option>
                        </select>

                        <select value={countryFilter} onChange={handleCountryChange} className="filterButton">
                            <option value="">Countries</option>
                            <option value="India">India</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Portugees">Portugees</option>
                            <option value="USA">USA</option>
                            <option value="Belgium">Belgium</option>
                        </select>
                    </div>
                    <p className="resultsP">Results for "{searchInput}."</p>
                    <MovieListWithPagination
                        currentItems={movieItems}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        updatePage={updatePage}
                    />
                </>
            ) : (
                <MovieListWithPagination
                    currentItems={movieItems}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    updatePage={updatePage}
                />
            )}

        </div>
    );
};

export default Home;
