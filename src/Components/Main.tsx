import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { MainHeader } from '../allFiles';
import '../styles/Main.css';
import { User } from '../types/user';

interface MainProps{
    user: User
}

export default function Main(props: MainProps){
    const navigate = useNavigate();
    function make_it_team(){
        navigate('/community')
    }
    return(
        <div>
            <MainHeader user={props.user} />
            <section className={"section_main"}>
                <div className="imgdiv">
                    <img src={"images/teamimg1.png"} className="sec--img" alt={"icon"}/>
                </div>
                <button className="sec--button" onClick={make_it_team}>팀 구하러 가기</button>
                <p className='sec--button--or'>OR</p>
                <button className='sec--button'>팀 만들기</button>
            </section>
        </div>
        )
}

