import React, {useEffect, useState} from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import {searchMoviesQuery} from "../api/api.js"
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

const MoviesPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [movies, setMovies] = useState(() =>  localStorage.getItem("searchResults") ? JSON.parse(localStorage.getItem("searchResults")) : []);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchMoviesQuery(searchItem);
            setMovies(data.results);
            navigate(`/movies?query=${encodeURIComponent(searchItem)}`);
            localStorage.setItem("searchResults", JSON.stringify(data.results));
        } catch (error) {

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