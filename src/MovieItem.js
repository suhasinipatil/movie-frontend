import styles from "./styles/MovieItem.module.css";

const MovieItem = ({ movie }) => {
    return (
        <div className={styles.movieItem}>
            <img className={styles.moviePoster} src={movie.poster} alt={movie.title} />
            {/* <h2>{movie.title}</h2>
            <p>{movie.year}</p> */}
        </div>
    );
};

export default MovieItem;