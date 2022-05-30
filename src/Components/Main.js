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
            <header>
                <nav className='container'>
                    <div className="nav--left rows">
                        <div className='nav--menus rows'>
                            <img src={"images/tcpicon.png"} className="nav--logo" onClick={() => navigate('/')} />
                            <button onClick={Sign_in} className="continue_BSM">BSM 계정으로 계속</button>
                        </div>
                        <div className='rows'>
                            <Link to={"/TeamRecruitment"} className="nav--link">팀원 모집</Link>
                            <Link to={"/community"} className="nav--link">커뮤니티</Link>
                            <Link to={"/ourTeam"} className="nav--link">나의 팀</Link>
                            <Link to={"/Canvas"} className="nav--link">캔버스</Link>
                        </div>
                    </div>
                    <div className="nav--right">
                        <button onClick={Sign_in} className="continue_BSM">BSM 계정으로 계속</button>
                    </div>
                </nav>
            </header>
            <section>
                <div className="imgdiv">
                    <img src={"images/teamimg1.png"} className="sec--img"/>
                </div>
                <button className="sec--button" onClick={make_it_team}>팀 구하러 가기</button>
            </section>
        </div>
        )
}

