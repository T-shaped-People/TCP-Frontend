import '../styleComponents/Main.css';
import {Link} from "react-router-dom";
import React from 'react';

export default function Main(){
    return(
        <div>
            <nav>
                <img src={"images/tcpicon.png"} />
                <Link to={"/TeamRecruitment"} className={"link"}>팀원 모집</Link>
                <Link to={"/community"} className={"link"}>커뮤니티</Link>
                <Link to={"/ourTeam"} className={"link"}>나의 팀</Link>
                <div className={"nav--div"}>
                    <Link to={"/signup"} className={"sign-up"}>Sign up</Link>
                    <Link to={"/Login"} className={"sign-in"}>Sign in</Link>
                </div>
            </nav>
            <section>
                <div className={"imgdiv"}>
                    <img src={"images/teamimg1.png"} className="sec--img"/>
                </div>
                <button className="sec--button">팀 구하러 가기</button>
            </section>
        </div>
        )
}

