import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {getMovieById, getMovieByIdCredits, getMovieByIdReviews} from "../api/api.js"
import movieDetailsPage from "./movieDetailsPage.module.css";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

const MovieDetailsPage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [url, setUrl] = useState('https://image.tmdb.org/t/p/w500/');
    const [loading, setLoading] = useState(true);
    const [cast, setCast] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [activePage, setActivePage] = useState("");

    const convertToPercentage = (rating) => {
        const percentage = Math.round((rating / 10) * 100);
        return `${percentage}%`;
    };

    const goBack = () => {
        window.history.back();
    };

    const fetchReviews = async () => {
        try {
            const data = await getMovieByIdReviews(id);
            setReviews(data);
            setActivePage("reviews");
        } catch (error) {

        }
    };

    const fetchCast = async () => {
        try {
            const data = await getMovieByIdCredits(id);
            setCast(data);
            setActivePage("cast");
        } catch (error) {

        }
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

        const fetchInitialData = async () => {
            const path = window.location.pathname;
            const activePage = path.split("/")[3];

            if (activePage === "cast") {
                fetchCast();
            } else if (activePage === "reviews") {
                fetchReviews();
            }
        };

        fetchData();
        fetchInitialData();
    }, [id]);

    return (
        <div className={movieDetailsPage.details}>
            <button onClick={goBack} className={movieDetailsPage['back-button']}>
                Go back
            </button>
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
                <NavLink to="cast" onClick={fetchCast}>Cast</NavLink>
                <NavLink to="reviews" onClick={fetchReviews}>Reviews</NavLink>
            </div>

            {activePage === "cast" && cast && <MovieCast cast={cast} />}
            {activePage === "reviews" && reviews && <MovieReviews reviews={reviews} />}
        </div>
    )
}
export default MovieDetailsPage;