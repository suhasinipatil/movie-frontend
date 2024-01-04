// Desc: Home page
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

const Home = ({ searchInput }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchInput === "") return;
        fetch(`http://localhost:8080/movies/${searchInput}/similar`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setMovies(json);
            });
    }, [searchInput]);

    return (
        <div className="Home">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default Home;