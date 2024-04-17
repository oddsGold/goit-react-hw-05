import React from "react";
import navigation from "./Navigation.module.css"
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return(
        <nav className={navigation.navigation}>
            <div className={navigation["navigation-row"]}>
                <NavLink to="/">
                    <p>Home page</p>
                </NavLink>
                <NavLink to="/movies">
                    Movies
                </NavLink>
            </div>
        </nav>
    )
}
export default Navigation;