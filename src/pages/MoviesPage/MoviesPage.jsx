import React, {useEffect, useState} from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import {searchMoviesQuery} from "../api/api.js"
import {useLocation, useSearchParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

const MoviesPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const query = searchParams.get("query");
            if (query) {
                try {
                    const data = await searchMoviesQuery(query);
                    setMovies(data.results);
                    setSearchItem(query);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [searchParams]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setMovies([]);
            setSearchParams({ query: searchItem });
            const data = await searchMoviesQuery(searchItem);
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchItem} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            {movies.length > 0 && (
                <>
                    <Header>
                        Last search
                    </Header>
                    <MovieList movies={movies} />
                </>
            )}
        </>
    );
};

export default MoviesPage;