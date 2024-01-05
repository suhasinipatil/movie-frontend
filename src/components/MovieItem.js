import styles from "../styles/MovieItem.module.css";

const MovieItem = ({ movie }) => {
    return (
        <div className={styles.movieItem}>
            <img className={styles.moviePoster} src={movie.Poster} alt={movie.Title} />
        </div>
    );
};

export default MovieItem;