import React,{ useState,useEffect} from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './card.css';
import { Link } from "react-router-dom";
// This is a basic card component that we will use in each & every page i.e upcoming, popular & top_rated

// it'll recieve the movies as props
const Cards = ({movie}) => {

    // we are setting the preloader first as true so as to show off our css
    const [isLoading, setIsLoading] = useState(true)

    // useEffect to false the preLoader after 1.5 seconds(using setTimeout)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, []) 

    return <>
    {
        
        isLoading
        ?
        <div className="cards"> {/* As long as isLoading is true, the preloder css will show and it has a specific tag i.e Skeleton theme */}
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :  
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}> {/* When isLoading is false, show the card details along with their css*/}
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} /> {/*For importing the image */}
                <div className="cards__overlay">
                    <div className="card__title">{movie && movie.original_title}</div> {/* For original title */}
                    <div className="card__runtime">
                        {movie && movie.release_date} {/* For release date */}

                        <span className="card__rating">{movie && movie.vote_average} <i className="fas fa-star" /></span> {/* For voting average*/}
                    </div> 
                    <div className="card__description">{movie && movie.overview.slice(0,118) + "..."}</div> {/* For movie overview*/}
                </div>
            </div>
        </Link>
    }
    </>
}
 
export default Cards;