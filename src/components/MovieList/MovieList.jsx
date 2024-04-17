import React from "react";
import {NavLink} from "react-router-dom";
import movieList from './MovieList.module.css'

const MovieList = ({movies}) => {
    return (
        <>
            <ul className={movieList['list']}>
                {movies.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <NavLink to={`/movies/${item.id}`}>{item.original_title}</NavLink>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default MovieList;