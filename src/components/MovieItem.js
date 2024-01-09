import styles from "../styles/MovieItem.module.css";
import noPoster from "../images/no-poster.jpg";

const MovieItem = ({ movie }) => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : noPoster;

    return (
        <div className={styles.movieItem}>
            <img className={styles.moviePoster} src={poster} alt={movie.Title} />
            <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.Title}</h3>
                <p className={styles.movieYear}>{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieItem;