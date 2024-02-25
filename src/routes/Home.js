// Desc: Home page

import { useEffect, useState, useContext } from "react";
import MovieItem from "../components/MovieItem";
import { AuthContext } from '../contexts/AuthContext';
import { MovieContext } from '../contexts/MovieContext';
import { useSelector } from "react-redux";

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { handleSetMovies } = useContext(MovieContext);

    const [genreFilter, setGenreFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [favouriteMovies, setFavouriteMovies] = useState([]);

    const moviesState = useSelector((state) => state.movies);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const updatePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);

    // Fetch favourite movies when user is logged in
    useEffect(() => {
        //console.log(user.token, user.loggedIn);
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
                        setFavouriteMovies([]);
                    } else {
                        setFavouriteMovies(json);
                        handleSetMovies(json);
                    }
                });
        }
    }, [user.loggedIn, user.token, handleSetMovies]);

    // Fetch all movies when user is not logged in
    useEffect(() => {
        if (!user.loggedIn) {
            //console.log("Fetching movies");
            //console.log(moviesState);
            setMovies(moviesState);
        }
    }, [moviesState, user.loggedIn]);

    useEffect(() => {
        if (searchInput === "") return;
        //add searhInput in params
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
    }, [searchInput]);

    return (
        <div className="Home">
            {error ? (
                <p className="errorMessage">{error}</p>
            ) : searchInput !== "" ? (
                <>
                    <div className="filter-container">
                        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} className="filterButton">
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

                        <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)} className="filterButton">
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

                        <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="filterButton">
                            <option value="">Countries</option>
                            <option value="India">India</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Portugees">Portugees</option>
                            <option value="USA">USA</option>
                            <option value="Belgium">Belgium</option>
                        </select>
                    </div>
                    <p className="resultsP">Results for "{searchInput}."</p>
                    {movies
                        .filter((movie) =>
                            movie.Genre.toLowerCase().includes(genreFilter.toLowerCase()) &&
                            movie.Language.toLowerCase().includes(languageFilter.toLowerCase()) &&
                            movie.Country.toLowerCase().includes(countryFilter.toLowerCase())
                        )
                        .map((movie) => (
                            <MovieItem key={movie.imdbID} movie={movie} IsFav={false} />
                        ))}
                </>
            ) : user.loggedIn ? (
                // Render favourite movies
                favouriteMovies
                    .map((movie) => (
                        <MovieItem key={movie.imdbID} movie={movie} IsFav={true} />
                    ))
            ) : (
                // Render all movies
                currentItems
                    .map((movie) => (
                        <MovieItem key={movie.imdbID} movie={movie} IsFav={false} />
                    ))
            )}
            <div className="pagination">
                <button onClick={() => updatePage(1)} disabled={currentPage === 1}>First</button>
                <button onClick={() => updatePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => updatePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <button onClick={() => updatePage(totalPages)} disabled={currentPage === totalPages}>Last</button>
            </div>
        </div>
    );
};

export default Home;
