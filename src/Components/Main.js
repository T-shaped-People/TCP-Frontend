import '../styles/Main.css';
import {Link, useNavigate} from "react-router-dom";
import React from 'react';

export default function Main(){
    const navigate = useNavigate();
    function make_it_team(){
        navigate('TeamRecruitment')
    }
    return(
        <div>
            <header className={"header_main"}>
                <nav className='container_main_nav'>
                    <div className="nav--left rows">
                        <div className='nav--menus rows'>
                            <img src={"images/tcpicon.png"} className="nav--logo" onClick={() => navigate('/Main')} alt={"이미지 로딩중..."}/>
                        </div>
                        <div className='rows'>
                            <Link to={"/TeamRecruitment"} className="nav--link">팀원 모집</Link>
                            <Link to={"/community"} className="nav--link">커뮤니티</Link>
                            <Link to={"/ourTeam"} className="nav--link">나의 팀</Link>
                            <Link to={"/Canvas"} className="nav--link">캔버스</Link>
                        </div>
                    </div>
                    <div className="nav--right">
                        <button className="continue_BSM">계정</button>
                    </div>
                </nav>
            </header>
            <section className={"section_main"}>
                <div className="imgdiv">
                    <img src={"images/teamimg1.png"} className="sec--img" alt={"이미지 로딩중..."}/>
                </div>
                <button className="sec--button" onClick={make_it_team}>팀 구하러 가기</button>
            </section>
        </div>
        )
}

