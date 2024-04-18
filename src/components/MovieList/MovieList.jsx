import React from "react";
import {Link, useLocation} from "react-router-dom";
import movieList from './MovieList.module.css'

const MovieList = ({movies}) => {
    const location = useLocation();

    return (
        <>
            <ul className={movieList['list']}>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link
                                to={`/movies/${item.id}`}
                                state= {{ from: location}}
                            >
                                {item.original_title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default MovieList;