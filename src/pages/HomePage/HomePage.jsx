import React, {useEffect, useState} from "react";
import {getPopularMovies} from "../api/api.js"
import MovieList from "../../components/MovieList/MovieList.jsx";
import Header from "../../components/Header/Header.jsx";

const HomePage = () => {

    const [movies, setMovies] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPopularMovies();
                setMovies(data)
            }catch (e) {

            }
        }

        fetchData();
    }, [])

    return(
        <>
            <Header>
                Trending today
            </Header>
            {movies.length > 0 && (
                <MovieList movies={movies} />
            )}
        </>
    )
}

export default HomePage;