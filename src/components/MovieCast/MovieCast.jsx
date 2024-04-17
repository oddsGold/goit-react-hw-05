import React, {useState} from "react";
import moviesCast from "./MovieCast.module.css";

const MovieCast = ({cast}) => {
    const [url, setUrl] = useState('https://image.tmdb.org/t/p/w500/');

    return (
        <div className={moviesCast['cast']}>
            {cast.cast.map((item) => {
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