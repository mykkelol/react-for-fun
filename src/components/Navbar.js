import React from 'react'
import {Link} from "react-router-dom" 

export default function NavBar() {
    return (
        <nav>
            <div>
                {/* link allows us to switch to the page linked without refreshing the whole reactapp */}
                <Link to="/">
                    Learn.Build.<span>Type.</span>
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/highScores">highScores</Link></li>
                </ul>
            </div>
        </nav>
    )
}
