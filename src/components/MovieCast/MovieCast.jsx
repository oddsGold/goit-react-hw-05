import React, {useEffect, useState} from "react";
import moviesCast from "./MovieCast.module.css";
import {useParams} from "react-router-dom";
import {getMovieByIdCredits} from "../../pages/api/api.js";

const MovieCast = () => {
    const [url, setUrl] = useState('https://image.tmdb.org/t/p/w500/');
    const {id} = useParams();
    const [cast, setCast] = useState(null);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const data = await getMovieByIdCredits(id);
                setCast(data.cast);
            } catch (error) {

            }
        };
        fetchCast();
    }, [id])


    return (
        <div className={moviesCast['cast']}>
            {cast && cast.length > 0 && cast.map((item) => {
                return (
                    <div key={item.id}>
                        {item.profile_path ? (
                            <img src={`${url}${item.profile_path}`} alt={item.name}/>
                        ) : (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt={item.name}/>
                        )}
                        <p>{item.name}</p>
                        <p>Character: {item.character}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default MovieCast;