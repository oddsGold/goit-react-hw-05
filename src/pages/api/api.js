import axios from "axios";

const ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTMwNTkyNjhkMTlmNDVkZjk0ZGU5NGZmMzRhNTQyMCIsInN1YiI6IjY2MWU4NGQyMDgxNmM3MDE3Y2VlNzMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XfRjYPi3YhnsV82p3xkVbKknEzrEW_KWug0EGDRCCU0';

const INSTANCE = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${ACCESS_KEY}`
    }
});

export const getPopularMovies = async () => {
    try {
        const response = await INSTANCE.get('/movie/popular');
        return response.data.results;
    } catch (error) {
        throw new Error('Failed to fetch popular movies');
    }
};

export const getMovieById = async (movieId) => {
    try {
        const response = await INSTANCE.get(`/movie/${movieId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch movie`);
    }
};

export const getMovieByIdCredits = async (movieId) => {
    try {
        const response = await INSTANCE.get(`/movie/${movieId}/credits`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch movie`);
    }
};

export const getMovieByIdReviews = async (movieId) => {
    try {
        const response = await INSTANCE.get(`/movie/${movieId}/reviews`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch movie`);
    }
};

export const searchMoviesQuery = async (query) => {
    try {
        const response = await INSTANCE.get(`/search/movie?query=${query}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to search movies by keyword`);
    }
};





