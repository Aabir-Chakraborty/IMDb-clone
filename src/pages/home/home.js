import React, { useEffect,useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";


const Home = () => {
    
    const [popular,setPopular] = useState([]);
    
    useEffect(() =>{
        // FETCH KRO API KO , FIR USKO JSON MEIN CONVERT KRO AND THEN YOU WILL GET THE DATA
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then((res) => {
            return res.json();
        })
        .then((data) =>{
            // NOW USS DATA KO USESTATE MEIN DAALO TAAKI popular mein data store hote rhe jaise jaise setPopular change krta rhe
            setPopular(data.results);
        })
    },[])


    return (
        <>
            <div className="poster">
                <Carousel 
                    showThumbs = {false}
                    autoPlay = {true}
                    transitionTime = {2}
                    infiniteLoop = {true}
                    showStatus = {false}
                >
                    { popular.map((movie) =>(
                        <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                        <div className="posterImage">
                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                        </div>
                        <div className="posterImage__overlay">
                            <div className="posterImage__title">{movie && movie.original_title}</div>
                            <div className="posterImage__runtime">
                                {movie && movie.release_date}
                                <span className="posterImage__rating">
                                    {movie && movie.vote_average}
                                    <i className="fas fa-star" />{" "}
                                </span>
                            </div>
                            <div className="posterImage__description">{movie && movie.overview}</div>
                        </div>
                    </Link>
                    ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    );
}

export default Home;