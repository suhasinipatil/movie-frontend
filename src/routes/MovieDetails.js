import { useLocation, useParams } from "react-router-dom";
import styles from "../styles/MovieDetails.module.css";

const MovieDetails = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const movie = location.state.movie;
    console.log(movie);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.poster} style={{ backgroundImage: `url(${movie.Poster})` }}></div>
                <h1 className={styles.title}>{movie.Title}</h1>
            </div>
            <p className={styles.plot}>{movie.Plot}</p>
            <div className={styles.containerIMdbRunTimeYear}>
                <p className={styles.rating}>IMDb {movie.imdbRating}</p>
                <p className={styles.runtime}>{movie.Runtime}</p>
                <p className={styles.year}>{movie.Year}</p>
            </div>
            <div className={styles.info}>
                <div className={styles.details}>

                    <p className={styles.genre}>{movie.Genre}</p>
                    <p className={styles.director}>{movie.Director}</p>
                    <p className={styles.writer}>{movie.Writer}</p>
                    <p className={styles.actors}>{movie.Actors}</p>
                    <p className={styles.language}>{movie.Language}</p>
                    <p className={styles.country}>{movie.Country}</p>
                    <p className={styles.awards}>{movie.Awards}</p>
                </div>
            </div>

        </div>
    );
};

export default MovieDetails;