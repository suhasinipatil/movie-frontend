// Desc: It fetches and displays data such as the movie's title, 
// description, ratings, and similar movies. It also allows users to favorite the movie.

import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from "../styles/MovieDetails.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MovieItem from "../components/MovieItem";
import { AuthContext } from '../contexts/AuthContext';
import { MovieContext } from "../contexts/MovieContext";
import { FixedSizeGrid as Grid } from "react-window";

const MovieDetails = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const movie = location.state.movie;
    const [isFavorited, setIsFavorited] = useState(false);
    const [movies, setMovies] = useState([]);
    const { user } = React.useContext(AuthContext);
    const { favMovies } = React.useContext(MovieContext);

    const columnCount = 5; // Adjust based on how many items you want in a row

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const movie = movies[rowIndex * columnCount + columnIndex];
        return (
            movie && (
                <div style={style}>
                    <MovieItem key={movie.imdbID} movie={movie} />
                </div>
            )
        );
    };

    useEffect(() => {
        isFavorited ? console.log("favorite") : console.log("not favorite");
    }, [isFavorited]);

    useEffect(() => {
        // Check if the current movie is in the user's favorites
        const isFav = favMovies.some(favMovie => favMovie.imdbID === movieId);
        setIsFavorited(isFav);
    }, [movieId, favMovies]);

    useEffect(() => {
        fetch(`http://localhost:8080/movies?imdbId=` + movieId)
            .then((response) => response.json())
            .then((json) => {
                if (json.message && json.message.includes("not found")) {
                    setMovies([]);
                } else {
                    setMovies(json);
                }
            });
    }, [movieId]);


    const addFavorite = () => {
        //console.log("Add to favorite ", isFavorited);

        if (!isFavorited) {
            //console.log("My favorite ", isFavorited);
            fetch(`http://localhost:8080/movies/favourite/${movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
            })
                .then(response => response.text())
                .then(data => {
                    //console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else if (isFavorited) {
            // console.log("Remove from my favorite ", isFavorited);
            fetch(`http://localhost:8080/movies/favourite/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
            })
                .then(response => response.text())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        setIsFavorited(!isFavorited);
    };

    return (
        <div>
            <div className={styles.details}>
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
                    {movie.Runtime !== "N/A" && (
                        <p className={`${styles.runtime} ${styles.margin}`}>{movie.Runtime}</p>
                    )}
                    {movie.Year !== "N/A" && (
                        <p className={`${styles.year} ${styles.margin}`}>{movie.Year}</p>
                    )}
                </div>
                <p className={`${styles.genre} ${styles.margin}`}>{movie.Genre}</p>
                {movie.Ratings && movie.Ratings.map((rating, index) => (
                    <p key={index} className={`${styles.rating} ${styles.ratingMargin}`}>
                        <span className={styles.label}>{rating.Source}:</span> {rating.Value}
                    </p>
                ))}
                <div className={styles.info}>
                    <div className={styles.details}>
                        {movie.Released !== "N/A" && (
                            <label className={styles.label}>
                                Released: <span className={styles.released}>{movie.Released}</span>
                            </label>
                        )}
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
            <br /><br /><br />
            <div>
                <h1 className={styles.MoreLikeThis}>More Like this</h1>
                <Grid
                    columnCount={columnCount}
                    columnWidth={200 + 100} // Adjust based on the width of your MovieItem
                    height={500} // Adjust based on your requirement
                    rowCount={Math.ceil(movies.length / columnCount)}
                    rowHeight={300 + 50} // Adjust based on the height of your MovieItem
                    width={1510} // Adjust based on your requirement
                >
                    {Cell}
                </Grid>
                {/* {movies.map((movie) => (
                    <MovieItem key={movie.imdbID} movie={movie} />
                ))} */}
            </div>
        </div>
    );
};

export default MovieDetails;