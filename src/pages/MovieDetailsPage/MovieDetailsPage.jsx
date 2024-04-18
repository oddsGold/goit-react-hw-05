import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams, Outlet, useLocation, Link} from "react-router-dom";
import {getMovieById} from "../api/api.js"
import movieDetailsPage from "./movieDetailsPage.module.css";

const MovieDetailsPage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [url, setUrl] = useState('https://image.tmdb.org/t/p/w500/');
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const previousPath = useRef(location.state?.from ?? '/movies');
    const convertToPercentage = (rating) => {
        const percentage = Math.round((rating / 10) * 100);
        return `${percentage}%`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
                setLoading(false);
            } catch (e) {

            }
        }
        fetchData();
    }, [id]);

    return (
        <div className={movieDetailsPage.details}>
            <NavLink to={previousPath.current} className={movieDetailsPage['back-button']}>Go back</NavLink>
            {!loading && movie && (
               <>
                   <div className={movieDetailsPage["details-row"]}>
                       <div className={movieDetailsPage["details-row-img"]}>
                           <img src={`${url}${movie.poster_path}`} alt={movie.original_title}/>
                       </div>
                       <div className={movieDetailsPage["details-row-description"]}>
                           <h2>{movie.title}</h2>
                           <p>Оцінка користувача: {convertToPercentage(movie.vote_average)}</p>
                           <p>
                               <span>Overview</span>
                               <span>{movie.overview}</span>
                           </p>
                           <p>
                               <span>Genres</span>
                               {movie.genres.map((item) => {
                                   return (
                                       <span key={item.id}>
                                        {item.name}
                                    </span>
                                   )
                               })}
                           </p>
                       </div>
                   </div>
               </>
            )}
            <div className={movieDetailsPage['add-info']}>
                <p>Additional information</p>
                <NavLink to="cast">Cast</NavLink>
                <NavLink to="reviews">Reviews</NavLink>
            </div>

            <Outlet />
        </div>
    )
}
export default MovieDetailsPage;