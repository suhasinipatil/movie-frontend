// Desc: Home page
import { useEffect, useState } from "react";
import MovieItem from "../components/MovieItem";

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchInput === "") return;
        fetch(`http://localhost:8080/movies/${searchInput}/similar`)
            .then((response) => response.json())
            .then((json) => {
                if (json.message) {
                    setError(searchInput + " " + json.message);
                    setMovies([]);
                } else if (json.length === 0) {
                    setError(searchInput + 'Movie not found');
                    setMovies([]);
                } else {
                    setError(null);
                    setMovies(json);
                }
            });
    }, [searchInput]);


    return (
        <div className="Home">
            {error ? <p className="errorMessage">{error}</p> : movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default Home;
