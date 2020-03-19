import React from 'react'
import './header.css';
function Header() {
    return (
        <div className = "header d-flex">
            <h3>Star-DB</h3>
            <ul className="d-flex">
                <li>People</li>
                <li>Starships</li>
                <li>Planets</li>
            </ul>
        </div>
    )
}

export default Header