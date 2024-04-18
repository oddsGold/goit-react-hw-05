import React, {useEffect, useState} from "react";
import moveReviews from './MovieReviews.module.css'
import {useParams} from "react-router-dom";
import {getMovieByIdReviews} from "../../pages/api/api.js";

const MovieReviews = () => {
    const {id} = useParams();
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getMovieByIdReviews(id);
                setReviews(data.results);
            } catch (error) {

            }
        };
        fetchReviews();
    }, [id]);

    if (!reviews || reviews.length === 0) {
        return (
            <div className={moveReviews['no-reviews']}>
                <p>We don't have any reviews for this movie</p>
            </div>
        );
    }

    return(
        <div className={moveReviews['reviews']}>
            {reviews && reviews.length > 0 && reviews.map((item) => {
                return (
                    <div key={item.id}>
                        <p>Author: {item.author}</p>
                        <p>{item.content}</p>
                    </div>
                )
            })}
        </div>
    )

}
export default MovieReviews;