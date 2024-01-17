import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from "../styles/MovieDetails.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieDetails = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const movie = location.state.movie;
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        isFavorited ? console.log("Favorited") : console.log("Not Favorited");
    }, [isFavorited]);

    const addFavorite = () => {
        setIsFavorited(!isFavorited);
        //console.log("Add to favorite");
        //console.log(JSON.stringify(movie));
        // fetch('http://localhost:8080/favorites', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(movie),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    return (
        <div>
            <div className={styles.container}>
                <img className={styles.poster} src={movie.Poster} alt={movie.Title} />
                <h1 className={styles.title}>{movie.Title}</h1>
                <FontAwesomeIcon icon={faHeart}
                    color="white"
                    size="1x"
                    onClick={addFavorite}
                    className={`${styles.heart} ${styles.heartMargin}` + (isFavorited ? ` ${styles.heartFavorited}` : "")}
                />
            </div>
            {movie.Plot !== "N/A" && (
                <p className={styles.plot}>{movie.Plot}</p>
            )}
            <div className={styles.containerIMdbRunTimeYear}>
                {movie.imdbRating !== "N/A" && (
                    <p className={`${styles.rating} ${styles.margin}`}>IMDb {movie.imdbRating}</p>
                )}
                {movie.Runtime !== "N/A" && (
                    <p className={`${styles.runtime} ${styles.margin}`}>{movie.Runtime}</p>
                )}
                {movie.Year !== "N/A" && (
                    <p className={`${styles.year} ${styles.margin}`}>{movie.Year}</p>
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.details}>
                    <p className={`${styles.genre} ${styles.margin}`}>{movie.Genre}</p>
                    {movie.Director !== "N/A" && (
                        <label className={styles.label}>
                            Director: <span className={styles.director}>{movie.Director}</span>
                        </label>
                    )}
                    {movie.Writer !== "N/A" && (
                        <label className={styles.label}>
                            Writer: <span className={styles.writer}>{movie.Writer}</span>
                        </label>
                    )}
                    {movie.Actors !== "N/A" && (
                        <label className={styles.label}>
                            Actors: <span className={styles.actors}>{movie.Actors}</span>
                        </label>
                    )}
                    {movie.Language !== "N/A" && (
                        <label className={styles.label}>
                            Language: <span className={styles.language}>{movie.Language}</span>
                        </label>
                    )}
                    {movie.Country !== "N/A" && (
                        <label className={styles.label}>
                            Country: <span className={styles.country}>{movie.Country}</span>
                        </label>
                    )}
                    {movie.Awards !== "N/A" && (
                        <label className={styles.label}>
                            Awards: <span className={styles.awards}>{movie.Awards}</span>
                        </label>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MovieDetails;