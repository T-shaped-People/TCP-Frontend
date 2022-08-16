import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/header/team-header.css"
import { UserContext } from "../../App";


const TeamHeader = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    if (!user.isLogin) navigate('/');
    return (
        <header className="team-header">
            <nav>
                <div className="nav--left">
                    
                </div>
                <ul className="nav--right rows">
                    <li>
                        <img src="images/speechbubble.png" alt="icon" className="team-header--speech"/>
                    </li>
                    <li>
                        <img src="images/carbon_notebook.png" alt="icon" className="team-header--notebook"/>
                    </li>
                    <li>
                        <input type="text" className="team-header--input"/>
                    </li>
                    <li className="header--username">
                        <img src="images/person.png" alt="icon" className="team-header--person"/>    
                        <span>{user.nickname}</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default TeamHeader;
