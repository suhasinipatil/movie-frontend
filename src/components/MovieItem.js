import styles from "../styles/MovieItem.module.css";
import noPoster from "../images/no-poster.jpg";
import { useNavigate } from 'react-router-dom';

const MovieItem = ({ movie }) => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : noPoster;
    const movieId = movie.imdbID;
    const navigate = useNavigate();

    const handleClick = (movie) => {
        //pass the movie object to the route
        navigate(`/${movieId}`, { state: { movie: movie } });
    };

    return (
        <div className={styles.movieItem}>
            <div className={styles.movieContent}>
                <button onClick={() => handleClick(movie)}>
                    <img className={styles.moviePoster} src={poster} alt={movie.Title} />
                </button>
                <div className={styles.movieInfo}>
                    <button >Add to Favorite</button>
                    <h3 className={styles.movieTitle}>{movie.Title}</h3>
                    <div className={styles.movieYearRuntime}>
                        <p className={styles.movieYear}>{movie.Year}</p>
                        <p className={styles.movieRuntime}>{movie.Runtime}</p>
                    </div>
                    <p className={styles.moviePlot}>{movie.Plot}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;