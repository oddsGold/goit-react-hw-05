import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./components/Navigation/Navigation.jsx";
import "reset-css/reset.css";
import './App.css'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = React.lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = React.lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = React.lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = React.lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));

function App() {
    return (
        <div className="wrapper">
            <Navigation />

            <div className="main">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movies/*" element={<MoviesPage />} />
                        <Route path="/movies/:id" element={<MovieDetailsPage />}>
                            <Route path="cast" element={<MovieCast />} />
                            <Route path="reviews" element={<MovieReviews />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;