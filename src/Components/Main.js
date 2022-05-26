import '../styleComponents/Main.css';
import {Link, useNavigate} from "react-router-dom";
import React from 'react';

export default function Main(){
    const navigate = useNavigate();
    function Sign_in(){
        window.location.href = "http://bssm.kro.kr/oauth/login?clientId=4edf448e&redirectURI=http://localhost:3000/user/oauth"
    }
    function make_it_team(){
        navigate('TeamRecruitment')
    }
    return(
        <div>
            <nav>
                <img src={"images/tcpicon.png"} onClick={() => navigate('/')} />
                <Link to={"/TeamRecruitment"} className={"link"}>팀원 모집</Link>
                <Link to={"/community"} className={"link"}>커뮤니티</Link>
                <Link to={"/ourTeam"} className={"link"}>나의 팀</Link>
                <Link to={"/Canvas"} className={"link"}>캔버스</Link>
                <div className={"nav--div"}>
                    <button onClick={Sign_in} className={"continue_BSM"}>BSM 계정으로 계속</button>
                </div>
            </nav>
            <section>
                <div className={"imgdiv"}>
                    <img src={"images/teamimg1.png"} className="sec--img"/>
                </div>
                <button className="sec--button" onClick={make_it_team}>팀 구하러 가기</button>
            </section>
        </div>
        )
}

