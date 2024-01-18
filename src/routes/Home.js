// Desc: Home page
import { useEffect, useState } from "react";
import MovieItem from "../components/MovieItem";

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

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
    }, []);

    return (
        <div className="Home">
            {error ? <p className="errorMessage">{error}</p> : movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default Home;
