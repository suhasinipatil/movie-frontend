// Desc: Home page

import { useEffect, useState, useContext } from "react";
import MovieItem from "../components/MovieItem";
import { AuthContext } from '../contexts/AuthContext';

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const [genreFilter, setGenreFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');

    useEffect(() => {
        if (searchInput === "") return;
        fetch(`http://localhost:8080/movies/${searchInput}`)
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

    useEffect(() => {
        if (user.loggedIn) {
            fetch(`http://localhost:8080/movies/favourite`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.message && json.message.includes("not found")) {
                        setMovies([]);
                    } else {
                        setMovies(json);
                    }
                });
        }
        else {
            fetch(`http://localhost:8080/movies/year`)
                .then((response) => response.json())
                .then((json) => {
                    if (json.message && json.message.includes("not found")) {
                        setError(`No movies found.`);
                        setMovies([]);
                    } else {
                        setError(null);
                        setMovies(json);
                    }
                });
        }
    }, [user.loggedIn]);

    return (
        <div className="Home">
            {searchInput !== "" ?
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
                </>
                : <br />}
            {error ? <p className="errorMessage">{error}</p> : movies.filter(movie =>
                movie.Genre.toLowerCase().includes(genreFilter.toLowerCase()) &&
                movie.Language.toLowerCase().includes(languageFilter.toLowerCase()) &&
                movie.Country.toLowerCase().includes(countryFilter.toLowerCase())
            ).map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default Home;
