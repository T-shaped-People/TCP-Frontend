import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import "../../styles/header/team-header.css"

interface PropsType {
    user: User
}

const TeamHeader: React.FC<PropsType> = (props: PropsType) => {
    const navigate = useNavigate();
    const { user } = props;
    if (!user.isLogin) navigate('/');
    return (
        <header className="team-header">
            <nav>
                <img src="images/speechbubble.png" alt="icon" className="team-header--speech"/>
                <img src="images/carbon_notebook.png" alt="icon" className="team-header--notebook"/>
                <input type="text" className="team-header--input"/>
                <img src="images/person.png" alt="icon" className="team-header--person"/>
                <p className="team-header--username">{
                    user.nickname
                }</p>
            </nav>
        </header>
    )
}

export default TeamHeader;
