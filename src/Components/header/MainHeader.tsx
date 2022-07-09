import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import "../../styles/header/base.css"

interface PropsType {
    user: User
}

const MainHeader: React.FC<PropsType> = (props: PropsType) => {
    const navigate = useNavigate();
    const { user } = props;
    if (!user.isLogin) navigate('/');
    return (
        <header className="main_header">
            <nav>
                <div className="nav--left rows">
                    <div className='nav--menus rows'>
                        <img src="images/tcpicon.png" className="nav--logo" alt="icon"/>
                    </div>
                    <div className='rows'>
                        <Link to="/team-recruitment" className="nav--link">팀원 모집</Link>
                        <Link to="/community" className="nav--link">커뮤니티</Link>
                        <Link to="/team" className="nav--link">나의 팀</Link>
                    </div>
                </div>
                <div className="nav--right">
                    <span className="header--username">{
                        user.nickname
                    }</span>
                </div>
            </nav>
        </header>
    )
}

export default MainHeader;
