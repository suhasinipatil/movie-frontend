import styles from "../styles/MovieItem.module.css";
import noPoster from "../images/no-poster.jpg";

const MovieItem = ({ movie }) => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : noPoster;

    return (
        <div className={styles.movieItem}>
            <div className={styles.movieContent}>
                <img className={styles.moviePoster} src={poster} alt={movie.Title} />
                <div className={styles.movieInfo}>
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