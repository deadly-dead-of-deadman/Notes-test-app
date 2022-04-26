import React from "react";

export const Header = ({setModalActive}) => {
    return (
        <div class ="header">
            <a href="/" class="logo">Notes</a>
            <button className="loginButton" onClick={() => setModalActive(true)}>Sign up/ Sign in</button>
        </div>
    )
}