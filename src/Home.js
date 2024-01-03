// Desc: Home page
import Header from "./Header";
import MovieItem from "./MovieItem";

const Home = () => {
    const movies = [
        {
            title: "The Godfather",
            year: "1972",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            title: "The Shawshank Redemption",
            year: "1994",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            title: "The Godfather",
            year: "1972",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            title: "The Shawshank Redemption",
            year: "1994",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            title: "The Shawshank Redemption",
            year: "1994",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        },
        {
            title: "The Shawshank Redemption",
            year: "1994",
            poster: "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
        }
    ];

    return (
        <div className="Home">
            <Header />
            {movies.map((movie) => (
                <MovieItem movie={movie} />
            ))}
        </div>
    );
};

export default Home;