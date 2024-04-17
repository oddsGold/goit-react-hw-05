import React from "react";
import moveReviews from './MovieReviews.module.css'

const MovieReviews = ({reviews}) => {

    if (!reviews.results || reviews.results.length === 0) {
        return (
            <div className={moveReviews['no-reviews']}>
                <p>We don't have any reviews for this movie</p>
            </div>
        );
    }

    return(
        <div className={moveReviews['reviews']}>
            {reviews.results.map((item) => {
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